import ContentElements from "../contentElements/index.jsx";
import { isParagraph } from "functions/Paragraph.js";

const Section = ({
  insertedSingleColAds,
  insertedAds,
  elements,
  liveUpdates,
  insertAtSectionEnd,
  startIndex = 0,
  stopIndex,
  comesAfterDivider = false,
  noAds,
  fullWidth = true,
  rightRail = false,
  isSingleColumnArticle = false,
  isSpecialPresentation = false,
  isMeteredStory = false,
  globalContent,
}) => {
  const newContentElements = [];
  const alignedContentElements = [];
  const { display: displayLiveUpdatesUrl, liveUpdatesURL: liveUrl } =
    liveUpdates || {};
  let paragraphCounter = 0;
  // setting the default value based on subType if stopIndex is not provided
  const stopIndexLimit =
    stopIndex ||
    (isSingleColumnArticle ? elements.length + 10 : elements.length + 1);
  const incompleteSectionSegment = stopIndexLimit > elements.length;
  const insertPaygateAfter =
    isSingleColumnArticle && !isSpecialPresentation && isMeteredStory
      ? 3
      : null;
  let blockOfAlignedElements = [];
  const endBlockOfAlignedElements = () => {
    if (blockOfAlignedElements?.length) {
      const alignedElObj = {
        type: "aligned_elements",
        items: blockOfAlignedElements,
      };
      alignedContentElements.push(alignedElObj);
      newContentElements.push(alignedElObj);
      blockOfAlignedElements = [];
    }
  };

  if (isSingleColumnArticle) {
    // we respect stopIndex for special presentations
    const subsetOfElements = isSpecialPresentation
      ? elements.slice(startIndex, stopIndex)
      : elements;
    subsetOfElements.forEach((element) => {
      const { type, alignment } = element;
      const supportedElementTypes = [
        "text",
        "image",
        "raw_html",
        "quote",
        "video",
      ];
      const isSupportedElement =
        supportedElementTypes.includes(type) &&
        (alignment === "left" || alignment === "right");

      if (isSupportedElement) {
        // since element is a supported, aligned element, push it to the current block
        blockOfAlignedElements.push(element);
      } else {
        // else if element is not a supported, aligned element end the current block in case it is "open"
        // and then push the element
        endBlockOfAlignedElements();
        alignedContentElements.push(element);
        newContentElements.push(element);
      }
    });
    // call this one more time in case the story ends with a block of aligned elements
    endBlockOfAlignedElements();

    // go through and insert ads (and ad-like promo units) for storypage only (i.e. when insertedSingleColAds exists)
    if (insertedSingleColAds) {
      paragraphCounter = 1;
      let insertedAdCount = 1;
      alignedContentElements.forEach((element, i) => {
        if (isParagraph(element.type)) {
          insertedSingleColAds.forEach((ad) => {
            if (
              ad.insertAfterParagraph === paragraphCounter &&
              (!noAds || (noAds && !ad.isAd))
            ) {
              ad.adArray.forEach((adUnit) => {
                const insertedAd =
                  typeof adUnit === "function" ? adUnit() : adUnit;
                newContentElements.splice(i + insertedAdCount, 0, insertedAd);
                insertedAdCount += 1;
              });
            }
          });
          paragraphCounter += 1;
        }
      });
    }
  } else {
    elements.forEach((element, i) => {
      const isLastItemInSection =
        incompleteSectionSegment && i === elements.length - 1;
      // filters the paragraphs to only show the ones inside the range specified by startIndex and stopIndexLimit
      if (startIndex <= paragraphCounter && paragraphCounter < stopIndexLimit) {
        // right rail comes first to properly handle the two paragraph scenario (see APD-1478 for more details)
        if (rightRail) {
          // we check to be sure the current element is a "paragraph"
          // and that it's the paragraph (index) that we want our right rail ad inserted before
          const rightRailInsertIndex =
            isParagraph(element.type) &&
            paragraphCounter + 1 === rightRail.insertBeforeParagraph;
          if (rightRailInsertIndex && typeof rightRail.ad === "function") {
            newContentElements.push(rightRail.ad());
          }
        }
        // it's the `stop index` or the last item in a list that doesn't have enough items to reach the stop index
        if (stopIndexLimit === elements.length || isLastItemInSection) {
          newContentElements.push(element);
        }
        // handle ads, if there are any
        if (insertedAds) {
          let insertIndex;
          if (stopIndexLimit === elements.length || isLastItemInSection) {
            insertIndex = insertedAds.findIndex(
              (el) => paragraphCounter + 1 === el.insertAfterParagraph
            );
          } else {
            insertIndex = insertedAds.findIndex(
              (el) => paragraphCounter === el.insertAfterParagraph
            );
          }
          if (insertIndex > -1) {
            insertedAds[insertIndex].adArray.forEach((el) => {
              newContentElements.push(el());
            });

            // removes the ad from the array to make sure we don't accidentally display it again
            insertedAds.splice(insertIndex, 1);
          }
        }
        // it's not last (and thus hasn't already been added) so add it to the array
        if (stopIndexLimit !== elements.length && !isLastItemInSection) {
          newContentElements.push(element);
        }
      }

      // keeps track of how many paragraphs have been mapped through
      if (isParagraph(element.type)) {
        paragraphCounter += 1;
      }

      return null;
    });
  }

  // Inserts components at end of section.
  // Most useful for inserting components like connext end-of-story and blog author info at the end of the last section
  // The two conditionals here allow components to be inserted directly or to be returned from functions
  if (insertAtSectionEnd) {
    insertAtSectionEnd.forEach((component) => {
      if (React.isValidElement(component)) {
        newContentElements.push(component);
      } else if (
        typeof component === "function" &&
        React.isValidElement(component)
      ) {
        newContentElements.push(component());
      }
    });
  }
  if (insertPaygateAfter && newContentElements.length) {
    const prePaygateElements = [];
    let prePaygateElementCount = 0;
    let startIndexOfPaygateElements = 0;
    newContentElements.forEach((el, i) => {
      if (prePaygateElementCount < insertPaygateAfter) {
        prePaygateElements.push(el);
        startIndexOfPaygateElements = i;
        if (isParagraph(el.type)) {
          prePaygateElementCount += 1;
        }
      }
    });
    return (
      <div
        className={`c-section b-sectionHome-padding
        ${fullWidth ? "full-width b-clear-both" : ""}
        ${!isSpecialPresentation ? "b-margin-bottom-d40-m20" : ""}
        ${comesAfterDivider ? "after-divider" : ""}`}
      >
        {prePaygateElements.length && (
          <ContentElements contentElements={prePaygateElements} />
        )}
        {prePaygateElementCount >= insertPaygateAfter && (
          <div className="story-paygate_placeholder">
            <ContentElements
              contentElements={newContentElements.splice(
                startIndexOfPaygateElements + 1
              )}
              startIndex={startIndexOfPaygateElements + 1}
            />
          </div>
        )}
        {displayLiveUpdatesUrl && (
          <div className="live-update-link">
            <p>
              This was originally published on our{" "}
              <a href={liveUrl}>Live Updates</a> page.
            </p>
          </div>
        )}
      </div>
    );
  }

  if (newContentElements.length) {
    return (
      <div
        className={`c-section b-sectionHome-padding
        ${fullWidth ? "full-width b-clear-both" : ""}
        ${!isSpecialPresentation ? "b-margin-bottom-d40-m20" : ""}
        ${comesAfterDivider ? "after-divider" : ""}`}
      >
        <ContentElements contentElements={newContentElements} />
        {displayLiveUpdatesUrl && (
          <div className="live-update-link">
            <p>
              This was originally published on our{" "}
              <a href={liveUrl}>Live Updates</a> page.
            </p>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default Section;
