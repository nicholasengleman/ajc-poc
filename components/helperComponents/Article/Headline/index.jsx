import React, { Suspense, lazy } from "react";
import checkTags from "functions/checkTags";
import Image from "components/helperComponents/Image";
import NextImage from "next/image";
import SubHeadline from "../SubHeadline";
// import LoadingSpinner from "../../global/loadingSpinner/default";
// import Gallery from '../../../features/gallery/default';
import "./style.scss";

// const LazyAnimatedTease = lazy(() =>
//   import("../../global/AnimatedTease/default")
// );
// const LazyVideo = lazy(() => import("../../global/video/default"));

/**
 * Headline Component
 *
 * This component renders a Article headline with various media types (image, gallery, video, etc.)
 * based on the provided promo items and content type.
 *
 * @component
 * @param {Object} [props.promoItems={}] - PromoItems object from the content api
 * @param {Object} props.headlines - Headlines object from the content api
 * @param {Object} [props.taxonomy={}] - Taxonomy object from the content api
 * @param {Array} [props.taxonomy.tags=[]] - Tags object from the content api
 * @param {string} [props.contentType=''] - The type of content being displayed
 * @param {boolean} [props.lazyLoad=false] - Whether to lazy load media content
 * @param {object|null} [props.subheadlines=null] - Subheadlines object from the content api
 * @param {boolean} [props.isSectionLabel=false] - Whether this headline is a section label
 * @param {React.Component|Object|null} [props.sectionLabelComponent=null] - (Optional) <SectionLabelComponent> for special placement for cohort treatment.
 * @param {boolean} [props.isLeadImageArticle=false] - (Optional) Whether this is a headline on a cohort lead image page.
 * @param {boolean} [props.isGalleryBasic=false] - (Optional) Whether this is a headline on a gallery leaf page.
 *
 * @returns {React.Component}
 */

const Headline = ({
  promoItems = {},
  headlines = {},
  taxonomy = {},
  contentType = "",
  subheadlines = null,
  isSectionLabel = false,
  sectionLabelComponent = null,
  isLeadImageArticle = false,
  isHideFeaturedMediaTrue = false,
  isGalleryBasic = false,
}) => {
  let promoData = { type: "" };
  const { basic: basicItems, html } = promoItems || {};
  const arcSite = "ajc";

  if (basicItems) {
    promoData = basicItems;
  }
  if (html) {
    promoData = html;
  }

  const { tags = [] } = taxonomy;
  const isObit = checkTags(tags, "obitslegacy");
  const isAnimatedTease =
    promoData.type === "gallery" &&
    checkTags(promoData?.taxonomy?.tags, "animate");
  const showOnlyFirstImage =
    isAnimatedTease && checkTags(tags, "animate: show first img only");
  const showOnlyLastImage =
    isAnimatedTease && checkTags(tags, "animate: show last img only");

  // const { featuredVideoPlayerRules, maxTabletViewWidth } =
  //   getProperties(arcSite);

  // Uncomment to see how the headline component displays with a video promo type.
  // Used because I was getting errors when trying to add a video as a featured element.
  // promoData.type = 'video';

  const getType = () => {
    if (isGalleryBasic) return "gallery"; // leaf galleries
    if (promoData.type === "video") {
      return "video";
    }
    if (
      promoData.type === "gallery" &&
      promoData.content_elements &&
      !isAnimatedTease
    ) {
      return "gallery";
    }
    if (promoData.type === "gallery" && isAnimatedTease) {
      return "image";
    }
    if (promoData.type === "image") {
      return "image";
    }
    if (promoData.type === "raw_html") {
      return "raw_html";
    }
    return "just-headline";
  };

  const promoDataType = getType();
  const includeSectionLabelWithHeadline =
    isLeadImageArticle ||
    promoDataType === "gallery" ||
    promoDataType === "image" ||
    promoDataType === "video" ||
    promoDataType === "raw_html";

  const headline = (
    <div className="headline">
      <div className="headline-body">
        {includeSectionLabelWithHeadline &&
          sectionLabelComponent &&
          sectionLabelComponent}
        <h1
          className={`headline-text ${
            headlines.basic.length > 50 ? "headline-text-long" : ""
          }`}
        >
          {headlines.basic}
        </h1>
      </div>
      {subheadlines && <SubHeadline subheadlines={subheadlines} />}
    </div>
  );

  console.log("promo data", promoData);

  return (
    <div
      className={
        getType() !== "just-headline"
          ? "c-header-gallery-image-video b-margin-bottom-d30-m20"
          : "c-header b-contentMaxWidth"
      }
    >
      <div
        className={`article-headline-component b-margin-bottom-d30-m30 with-${getType()} ${
          isSectionLabel ? "is-label" : ""
        }`}
      >
        {!isLeadImageArticle && headline}
        {
          !isHideFeaturedMediaTrue &&
            promoData.type === "image" &&
            (!isObit || (isObit && arcSite !== "ajc")) && (
              <NextImage src={promoData?.url} width={1000} height={900} />
            )
          // <Image
          //   imageType="isLeadImage"
          //   src={basicItems}
          //   //  maxTabletViewWidth={maxTabletViewWidth}
          //   noLazyLoad={true}
          //   cohortHeadline={isLeadImageArticle ? headline : null}
          //   alt="Headline Image"
          // />
        }
        {!isHideFeaturedMediaTrue &&
          isAnimatedTease &&
          (showOnlyFirstImage || showOnlyLastImage) && (
            <Image
              imageType="isLeadImage"
              alt="Headline Image"
              src={
                promoData.content_elements[
                  showOnlyFirstImage ? 0 : promoData.content_elements.length - 1
                ]
              }
              //  maxTabletViewWidth={maxTabletViewWidth}
              noLazyLoad={true}
              cohortHeadline={isLeadImageArticle ? headline : null}
            />
          )}
        {/* 
        // TODO: Fix Animated Tease
        {!isHideFeaturedMediaTrue &&
          isAnimatedTease &&
          !showOnlyFirstImage &&
          !showOnlyLastImage && (
            <Suspense
              fallback={
                <>
                  <div className="c-image-component">
                    <LoadingSpinner />
                  </div>
                </>
              }
            >
              <LazyAnimatedTease
                imageType="isLeadImage"
                src={promoData.content_elements}
                maxTabletViewWidth={maxTabletViewWidth}
                noLazyLoad={true}
              />
            </Suspense>
          )} */}
        {/* 
        // TODO: Fix Gallery
        {!isHideFeaturedMediaTrue &&
          promoData.type === 'gallery' &&
          !isAnimatedTease &&
          promoData.content_elements && (
            <Gallery promoItems={promoData} pageType={contentType} />
          )} */}
        {/* 
        // TODO: Fix Video
        {promoData.type === "video" && (
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
              isLeadVideo
              isStoryVideo
              src={basicItems}
              featuredVideoPlayerRules={featuredVideoPlayerRules}
              maxTabletViewWidth={maxTabletViewWidth}
              pageTaxonomy={taxonomy}
              isMeteredStory={false} // temporary "fix" to disable lead video blocker/paywall for elections
            />
          </Suspense>
        )} */}
        {/* 
        // TODO: Fix Raw HTML
        {promoData.type === "raw_html" && (
          <>
            {promoData?.content && (
              <Suspense
                fallback={
                  <>
                    <div className="c-video-component">
                      <LoadingSpinner />
                    </div>
                  </>
                }
              >
                <div
                  className="headline-video-embed"
                  dangerouslySetInnerHTML={{ __html: promoData.content }}
                />
              </Suspense>
            )}
          </>
        )} */}
      </div>
    </div>
  );
};

export default Headline;
