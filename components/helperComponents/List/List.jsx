import React, { useState, Fragment, useEffect } from "react";
import { useContent } from "fusion:content";
import { useFusionContext, useAppContext } from "fusion:context";
import updateImageRefs from "../../../layouts/_helper_functions/listpage/updateImageRefs";
import AddFirstInlineImage from "../../../../content/sources/helper_functions/AddFirstInlineImage";
import getNewsTipText from "../../../layouts/_helper_functions/listpage/getNewsTipText";
import getTitle from "../../../layouts/_helper_functions/listpage/getTitle";
import StoryTease from "../../../_helper_components/home/StoryTease/default";
import LoadMoreButton from "../../../_helper_components/loadMoreBtn/default";
import useBreakpoints from "../../../layouts/_helper_functions/useBreakpoints";
import "./default.scss";

/**
 * ListEnhanced feature renders a list of stories, loaded dynamically with a "Load More" button.
 * It also conditionally displays ads and handles special cases for staff bios.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.customFields - Custom fields for the list.
 * @param {Object} [props.customFields.content] - Content configuration for the list.
 * @param {string} [props.customFields.title] - Title of the list.
 * @param {string} [props.customFields.titleUrl] - Optional URL for the title.
 * @param {string} [props.customFields.textBox] - Text displayed beneath the title.
 * @param {Object} [props.adConfig] - adConfig object for this feature.
 *
 * @returns {React.Component}
 */

const List = ({ customFields, adConfig }) => {
  const arcSite = "ajc";

  const { content = {}, title, textBox, titleUrl } = customFields;
  const {
    contentConfigValues: customFieldsQuery,
    contentService: customFieldContentSource,
  } = content;
  let source = "";

  const storiesPerLoadMoreBtnClick = 10;
  const [storiesCount, setStoryCount] = useState(storiesPerLoadMoreBtnClick);
  const isStaffBio = globalContentContentSource === "author-search";
  const [staffStory, setStaffStory] = useState([]);
  const { isMobile } = useBreakpoints();
  const hasMultipleAds =
    adConfig.inContentNext && adConfig.inContentNext.length > 1;

  if (isStaffBio) {
    source = "author-stories-list";

    // Loading 10+ the number of storiesPerLoadMoreBtnClick basically preloads the next set.
    globalContentQuery.from = storiesCount - storiesPerLoadMoreBtnClick;
  } else if (customFieldContentSource) {
    source = customFieldContentSource;
  } else if (globalContentContentSource) {
    source = globalContentContentSource;
  }

  let contentData =
    source !== ""
      ? useContent({
          source,
          query: {
            ...customFieldsQuery,
            ...globalContentQuery,
            primarySize: [[630, 420]],
            arcSite,
          },
        })
      : null;

  const totalStories = contentData?.count;

  if (!Array.isArray(contentData)) {
    if (Array.isArray(contentData?.content_elements)) {
      contentData = contentData.content_elements;
    } else if (!staffStory) {
      return null;
    }
  }

  useEffect(() => {
    if (isStaffBio && contentData) {
      setStaffStory((prevState) => [...prevState, ...contentData]);
    }
  }, [contentData]);

  let storiesPerSection = Math.min(
    storiesPerLoadMoreBtnClick,
    contentData?.length
  );

  if (isStaffBio) {
    storiesPerSection = Math.min(
      storiesPerLoadMoreBtnClick,
      staffStory?.length
    );
  }

  let filteredStories = contentData?.slice(0, storiesCount);
  if (isStaffBio) {
    filteredStories = staffStory;
  }

  const moreStoriesToLoad =
    (!isStaffBio && !!(contentData?.length - filteredStories?.length)) ||
    (isStaffBio && totalStories > filteredStories?.length);
  const sections = Math.ceil(filteredStories?.length / storiesPerSection) || 0;

  let filteredTeases = AddFirstInlineImage(filteredStories);
  filteredTeases = updateImageRefs(filteredTeases);

  if (!Array.isArray(filteredTeases) || !filteredTeases?.length) {
    return null;
  }

  return (
    <div className="c-list">
      {getTitle({ title, titleUrl })}
      {getNewsTipText(textBox, "mobile-tablet")}
      {Array.from(Array(sections).keys()).map((i, sectionIndex) => (
        <Fragment key={sectionIndex}>
          <section className="section">
            <div className="content">
              {sectionIndex === 0 && getNewsTipText(textBox, "desktop")}
              <div className="list-items">
                {filteredTeases
                  .slice(
                    sectionIndex * storiesPerSection,
                    (sectionIndex + 1) * storiesPerSection
                  )
                  .map((el, storyIndex) => {
                    const storyPosition = (storyIndex % 10) + 1;
                    return (
                      <>
                        <StoryTease
                          key={storyIndex}
                          story={el}
                          isDisplayImage={true}
                          hideDescription={isMobile}
                        />
                        {!noAds &&
                          (storyPosition === 8 ||
                            (!moreStoriesToLoad &&
                              storyIndex === filteredStories.length)) && (
                            <AdContainer
                              adConfig={
                                sectionIndex > 0 && hasMultipleAds
                                  ? adConfig.inContentNext
                                  : adConfig.inContent
                              }
                              sectionIndex={sectionIndex}
                            />
                          )}
                      </>
                    );
                  })}
                {/* {filteredTeases.length < 8 && (
                  <AdContainer adConfig={adConfig.inContent} sectionIndex={0} />
                )} */}
              </div>
              {sectionIndex + 1 === sections && moreStoriesToLoad && (
                <>
                  <span className="separator-line" />
                  <LoadMoreButton
                    numberOfTotalStories={filteredStories?.length}
                    handleOnClick={() =>
                      setStoryCount(storiesCount + storiesPerLoadMoreBtnClick)
                    }
                    isRedesign={true}
                  />
                </>
              )}
            </div>
            <div className="right-rail">
              {/* {!noAds && (
                <AdContainer
                  adConfig={
                    sectionIndex === 0
                      ? [adConfig.rightRail[0]]
                      : [adConfig.rightRail[1] || adConfig.rightRail[0]]
                  }
                  sectionIndex={sectionIndex}
                />
              )} */}
            </div>
          </section>
        </Fragment>
      ))}
    </div>
  );
};

export default List;
