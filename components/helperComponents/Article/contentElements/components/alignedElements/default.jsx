import React, { createElement, Fragment, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import getProperties from "fusion:properties";
import Image from "../../../../global/image/default.jsx";
import Paragraph from "../paragraph/index.jsx";
import HTML from "../html/default.jsx";
import BlockQuote from "../blockQuote/index.jsx";
import Oembed from "../social_url/default.jsx";
import LoadingSpinner from "../../../../global/loadingSpinner/default.jsx";

const LazyVideo = lazy(() => import("../../../../global/video/default"));

const AlignedElements = ({ src, index }) => {
  const { inlineVideoPlayerRules, maxTabletViewWidth } = getProperties();
  const { items: elements } = src;
  const newAlignedElements = [];
  let columnArray = [];
  let alignDirection = "";
  let id = 0;

  const getComponent = (element, i) => {
    switch (element.type) {
      case "text":
        return <Paragraph src={element} key={`Paragraph-${i}`} />;
      case "image":
        return (
          <Image
            primarySize={[[800, 0]]}
            src={element}
            imageType="isInlineImage"
            imageMarginBottom="b-margin-bottom-d40-m20"
            maxTabletViewWidth={maxTabletViewWidth}
            key={`Image-${i}`}
          />
        );
      case "raw_html":
        return <HTML src={element} key={`Raw_HTML-${i}`} />;
      case "quote":
        return (
          <BlockQuote
            contentElements={element.content_elements}
            citation={element.citation}
            key={`BlockQuote-${i}`}
          />
        );
      case "video":
        return (
          <Suspense
            fallback={
              <>
                <div className="c-video-component">
                  <LoadingSpinner />
                </div>
              </>
            }
          >
            <LazyVideo
              src={element}
              isInlineVideo
              isStoryVideo
              maxTabletViewWidth={maxTabletViewWidth}
              inlineVideoPlayerRules={inlineVideoPlayerRules}
              key={`Video-${i}`}
              index={i}
            />
          </Suspense>
        );
      case "oembed_response":
        return <Oembed src={element} key={`Oembed-${i}`} />;
      default:
        if (element?.props?.componentName === "ArcAd") {
          return <Fragment key={`test-${i}`}>{element}</Fragment>;
        }
        return null;
    }
  };

  // it gets added to an array of those elements so they later can be inserted inside a column div inside the aligned elements block
  elements.forEach((element, i) => {
    // For the first element in a column
    if (columnArray.length === 0) {
      columnArray.push(getComponent(element, i));
      alignDirection = element?.alignment || "";
      return;
    }

    if (columnArray.length > 0) {
      if (alignDirection === "") {
        columnArray.push(getComponent(element, i));
        alignDirection = element?.alignment || "";
        return;
      }

      if (
        (alignDirection && element.alignment === alignDirection) ||
        element?.props?.componentName === "ArcAd"
      ) {
        columnArray.push(getComponent(element, i));
        return;
      }

      if (
        alignDirection &&
        element.alignment &&
        element.alignment !== alignDirection
      ) {
        // We've reached the end of the consecutively aligned elements,
        // if there have been consecutively left or right aligned elements and ads that we've added to the columnArray,
        // then put these inside a div inside the new aligned elements block
        if (alignDirection === "right") {
          // we always insert right-aligned elements at the front of the array, since we're moving to a float-based alignment (to allow text to wrap)
          newAlignedElements.unshift(
            createElement(
              "div",
              {
                key: `column-${id}`,
                className: `column align-${alignDirection}`,
              },
              columnArray
            )
          );
        } else {
          newAlignedElements.push(columnArray);
        }

        // Start a new column div
        id += 1;
        columnArray = [];
        columnArray.push(getComponent(element, i));
        alignDirection = element?.alignment || "";
      }
    }
  });

  // We've reached the end of the block of aligned elements, add the columnArray to the new Aligned Elements if it is not empty
  // This happens if the last element in this group of aligned elements is aligned the same way as the previous element.
  if (columnArray.length > 0) {
    if (alignDirection === "right") {
      // we always insert right-aligned elements at the front of the array, since we're moving to a float-based alignment (to allow text to wrap)
      newAlignedElements.unshift(
        createElement(
          "div",
          { key: `column-${id}`, className: `column align-${alignDirection}` },
          columnArray
        )
      );
    } else {
      newAlignedElements.push(columnArray);
    }
  }

  return (
    <div className="c-aligned-elements-row" data-index={index || null}>
      {newAlignedElements}
    </div>
  );
};

AlignedElements.propTypes = {
  src: PropTypes.object,
  index: PropTypes.number,
};

export default AlignedElements;
