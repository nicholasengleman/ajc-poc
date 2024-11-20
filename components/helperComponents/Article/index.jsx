/* eslint-disable react/no-unknown-property */
"use client";
import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import LazyLoad from "react-lazyload";
import fetchEnv from "@/functions/fetchEnv";
// import GlobalAdSlots from "../../_helper_components/global/ads/default";
import TimeStamp from "./TimeStamp/index.jsx";
import Byline from "./Byline/index.jsx";
import Headline from "./Headline/index.jsx";
import SectionLabel from "../SectionLabel/index.jsx";
import Section from "./Section/index.jsx";
// import Nativo from "../../_helper_components/article/nativo/nativo.jsx";
import BlogAuthor from "./BlogAuthor/index.jsx";
// import ArcAd from "../ads/default";
// import ContributorBadge from "../../_helper_components/global/contributorBadge/default";

import ConnextEndOfStory from "./ConnextEndOfStory/index.jsx";
import ConnextHyperLocalSubscription from "./ConnextHyperLocalSubscription/index.jsx";
// import FlatPage from "../../_helper_components/flatpage/default";
// import ConnextInlinePromoSubscription from "../../_helper_components/global/connextInlinePromo/default";
import SponsorBanner from "./SponsorBanner/index.jsx";
import SponsorRelatedBox from "./SponsorRelatedBox/index.jsx";
import SponsorStoryMessage from "./SponsorStoryMessage/index.jsx";
// import TopNavBreakingNews from "../../_helper_components/global/navBar/TopNavBreakingNews/default";
// import getPaywallStatus from "../../_helper_components/global/siteMeta/_helper_functions/getPaywallStatus";
// import RelatedList from "../../_helper_components/article/relatedList/default";
// import EndOfStory from "../../_helper_components/article/endOfStory/default";
// import PartnerBadge from "../../_helper_components/article/partnerBadge/default";
// import compileRecipeData from "../../layouts/_helper_functions/article/compileRecipeData";
// import ShareBar from "../../_helper_components/article/shareBar/default";
// import BottomBanner from "../../_helper_components/global/piano/_helper_components/BottomBanner";
// import LoadingSpinner from "../../_helper_components/global/loadingSpinner/default.jsx";
// import Recipe from "../Recipe/default";

import filterContentElements from "functions/article/filterContentElements.js";
import getQueryParams from "functions/getQueryParams.js";
import checkTags from "functions/checkTags.js";
import checkSponsor from "functions/checkSponsor.js";
import getSponsorData from "functions/getSponsorData.js";
import handleSiteName from "functions/handleSiteName.js";

// const LazyBoap = lazy(() =>
//   import("../../_helper_components/article/nativo/nativo.jsx")
// );

const Article = ({
  slug: requestUri,
  globalContent,
  includeHeaderAndFooter = false,
}) => {
  // const { children = [] } = props || {};
  // const [content] = children;
  const arcSite = "ajc";

  const currentEnv = fetchEnv();
  // const { connext, siteFullname, activeStoryLayout } = getProperties(arcSite);
  // const { allowMeter = false } = connext[currentEnv] || {};
  const [paywallContainer, setPaywallContainer] = useState(false);

  const options = useMemo(
    () => ({
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    }),
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      const intersecting = entry.isIntersecting;
      if (intersecting && window?.chartbeat) {
        window.chartbeat("trackPaywallShown");
        observer.disconnect();
      }
    }, options);

    const parent = document.querySelector("#fusion-app");

    const mutationObserver = new MutationObserver(() => {
      const payWallRef = parent.querySelector("#paywallContainer");
      if (payWallRef) {
        setPaywallContainer(payWallRef);
      }
    });

    mutationObserver.observe(parent, { childList: true, subtree: true });
    if (paywallContainer) {
      observer.observe(paywallContainer);
    }
  }, [options, paywallContainer]);

  if (!globalContent) return null;
  const {
    _id: uuid,
    first_publish_date: firstPublishDate,
    display_date: displayDate,
    content_elements: contentElements,
    promo_items: promoItems,
    subtype,
    headlines,
    label,
    taxonomy,
    canonical_website: canonicalSite,
    canonical_url: articleURL,
    subheadlines,
    credits,
    type,
  } = globalContent || {};

  const queryParams = getQueryParams(requestUri);
  const outPutTypePresent = Object.keys(queryParams).some(
    (paramKey) => paramKey === "outputType"
  );
  const noHeaderAndFooter =
    !includeHeaderAndFooter ||
    (outPutTypePresent && queryParams.outputType === "wrap");
  const isSingleColumnArticle = true;
  // const isSingleColumnArticle = activeStoryLayout === "article_singlecolumn";
  // if (subtype === "Flatpage")
  //   return (
  //     <FlatPage
  //       globalContent={globalContent}
  //       noHeaderAndFooter={noHeaderAndFooter}
  //     />
  //   );

  const { by: authorData } = credits || {};
  const { tags = [], sections } = taxonomy || {};

  // color scheme tag for story cards. see /components/_helper_components/article/contentElements/components/storyCards/
  const colorSchemeTag = tags.find(
    (t) => t && t.text.indexOf("colorscheme-") > -1
  );
  // const hyperlocalTags = getProperties().hyperlocalTags || [];
  // Both checks return true if the tag is present and false if not.
  const noAds = checkTags(tags, "no-ads");
  // const isHyperlocalContent = checkTags(tags, hyperlocalTags);
  const isCommunityContributor = checkTags(tags, "community contributor");
  const hideRelatedList = checkTags(tags, "no-related-list");
  const recipeData =
    (checkTags(tags, "recipes") || checkTags(tags, "recipe")) &&
    compileRecipeData(contentElements);
  const { sponsorSectionID } = checkSponsor(sections);
  const { sponsorName: sponsorContentLabel, disableSponsorRelatedBox } =
    getSponsorData(sections, true) || {};
  // const paywallStatus = getPaywallStatus();
  // const isMeteredStory =
  //   allowMeter && paywallStatus && paywallStatus.toLowerCase() !== "unmetered";
  const isMeteredStory = false;
  // const MP02 = () => (
  //   <ArcAd
  //     staticSlot={`MP02-Story${!isSingleColumnArticle ? "-Legacy" : ""}`}
  //     key={"MP02"}
  //   />
  // );
  // const MP03 = () => (
  //   <ArcAd
  //     staticSlot={`MP03-Story${!isSingleColumnArticle ? "-Legacy" : ""}`}
  //     key={"MP03"}
  //   />
  // );
  // const HP03 = (index) => (
  //   <ArcAd staticSlot="HP03-Story" key={`HP03-${index}`} />
  // );
  // const HP04 = (index) => (
  //   <ArcAd staticSlot="HP04-Story" key={`HP04-${index}`} />
  // );
  // const RP01StoryDesktop = () => (
  //   <ArcAd staticSlot="RP01-Story" key={"RP01-Story-Desktop"} />
  // );
  // const RP09StoryDesktop = () => (
  //   <ArcAd staticSlot="RP09-Story" key={"RP09-Story-Desktop"} />
  // );
  // const nativoEl = () => (
  //   <Nativo controllerClass="story-nativo_placeholder--moap" key="nativo" />
  // );
  // const PX01 = () => <ArcAd staticSlot="PX01" key={`PX01`} />;
  // const connextPromo = () => <ConnextInlinePromoSubscription />;

  // destructured it in two parts due to page getting broken when hide_timestamp doesn't exist
  const { hide_timestamp: hideTimestamp } = label || {};
  const { text: isHideTimestampTrue } = hideTimestamp || {};

  // if hide_featured_media doesn't exist (i.e. not selected in Composer), it will default to false
  const { hide_featured_media: { text } = {} } = label || {};
  const isHideFeaturedMediaTrue = text ? text === "Yes" : false;

  // check if text/url was given for live update link
  const liveUrl = label?.live_updates_url?.text;
  const finalLiveUpdateURL =
    canonicalSite && canonicalSite !== arcSite && arcSite === "ajc"
      ? `//${fetchEnv() !== "prod" ? "sandbox" : "www"}.${handleSiteName(
          canonicalSite
        )}.com${liveUrl}`
      : liveUrl;
  const addliveUpdatesURL = () => {
    let updateLabel = label?.live_updates_url;
    updateLabel = { ...updateLabel, liveUpdatesURL: finalLiveUpdateURL };
    return updateLabel;
  };
  // conditional fail safe to hide a live update link page if a url was not provided
  const liveUpdates = liveUrl
    ? addliveUpdatesURL(label, finalLiveUpdateURL)
    : { display: false };
  const filteredContentElements = filterContentElements({ contentElements });
  let infoBoxIndex = null;
  const insertAtEndOfStory = [];

  filteredContentElements.forEach((el, i) => {
    if (el && el.type === "divider" && infoBoxIndex === null) {
      infoBoxIndex = i;
    }
    return null;
  });

  if (infoBoxIndex !== null) {
    // there is an infobox.  To match criteria in APD-96 we must insert ConnextEndOfStory immediately prior to it
    filteredContentElements.splice(
      infoBoxIndex,
      0,
      <ConnextHyperLocalSubscription />,
      <ConnextEndOfStory />
    );
    infoBoxIndex += 1;
  } else {
    insertAtEndOfStory.push(
      <ConnextHyperLocalSubscription />,
      <ConnextEndOfStory />
    );
  }
  // const insertedSingleColAds = [
  //   { insertAfterParagraph: 2, adArray: [MP02, RP01StoryDesktop], isAd: true },
  //   { insertAfterParagraph: 6, adArray: [connextPromo] },
  //   { insertAfterParagraph: 7, adArray: [nativoEl], isAd: true },
  //   { insertAfterParagraph: 12, adArray: [MP03, RP09StoryDesktop], isAd: true },
  //   { insertAfterParagraph: 17, adArray: [PX01], isAd: true },
  //   { insertAfterParagraph: 22, adArray: [HP03(1)], isAd: true },
  //   { insertAfterParagraph: 27, adArray: [HP04(1)], isAd: true },
  //   { insertAfterParagraph: 32, adArray: [HP03(2)], isAd: true },
  //   { insertAfterParagraph: 37, adArray: [HP04(2)], isAd: true },
  //   { insertAfterParagraph: 42, adArray: [HP03(3)], isAd: true },
  //   { insertAfterParagraph: 47, adArray: [HP04(3)], isAd: true },
  //   { insertAfterParagraph: 52, adArray: [HP03(4)], isAd: true },
  //   { insertAfterParagraph: 57, adArray: [HP04(4)], isAd: true },
  //   { insertAfterParagraph: 62, adArray: [HP03(5)], isAd: true },
  // ];

  const isSectionLabel = !isCommunityContributor && taxonomy;

  // if subtype === 'LeadImageArticle', apply full width treatment
  const isLeadImageArticle = subtype?.toLowerCase() === "leadimagearticle";

  return (
    <>
      {/* {!noAds && <GlobalAdSlots uuid={uuid} taxonomy={taxonomy} />} */}
      {/* {!noHeaderAndFooter && <TopNavBreakingNews type={type} noAds={noAds} />} */}
      <SponsorBanner sponsorID={sponsorSectionID} isStoryPage={true} />
      <main
        className={`${
          isLeadImageArticle ? "lead-image-article" : ""
        } b-sectionHome-padding`}
      >
        <header
          className="b-margin-bottom-d30-m30"
          data-pagezone="article-body"
        >
          {!isLeadImageArticle && (
            <div className="c-label-wrapper b-padding-top-15 b-contentMaxWidth">
              {isSectionLabel && (
                <SectionLabel
                  label={label}
                  taxonomy={taxonomy}
                  sponsorContentLabel={sponsorContentLabel}
                />
              )}
            </div>
          )}
          <Headline
            headlines={headlines}
            promoItems={promoItems}
            taxonomy={taxonomy}
            contentType={type}
            isMeteredStory={isMeteredStory}
            subheadlines={subheadlines?.basic && subheadlines}
            isSectionLabel={!!isSectionLabel}
            sectionLabelComponent={
              <SectionLabel
                label={label}
                taxonomy={taxonomy}
                sponsorContentLabel={sponsorContentLabel}
              />
            }
            isLeadImageArticle={isLeadImageArticle}
            isHideFeaturedMediaTrue={isHideFeaturedMediaTrue}
          />
          <div
            className={`c-articleMetaContainer b-contentMaxWidth b-margin-bottom-d30-m20  ${
              isSingleColumnArticle ? "isSingleColumnArticle" : ""
            }`}
          >
            <div className="c-articleMeta">
              <div className="c-articleBadge">
                {/* TODO: <ContributorBadge tags={tags} /> */}
                {/* <PartnerBadge sections={sections} /> */}
              </div>
              <div className="c-articleMetadata">
                <div className="b-flexRow article-byline b-margin-bottom-d7-m7">
                  <Byline by={authorData} sections={sections} />
                </div>
                <TimeStamp
                  firstPublishDate={firstPublishDate}
                  displayDate={displayDate}
                  isHideTimestampTrue={isHideTimestampTrue}
                  // isHyperlocalContent={
                  //   isHyperlocalContent && isCommunityContributor
                  // }
                  isHyperlocalContent={false}
                  sponsorContentLabel={sponsorContentLabel}
                />
              </div>
            </div>
            {/* <ShareBar articleURL={articleURL} headlines={headlines} /> */}
          </div>
        </header>

        <article
          className={`c-articleContent ${
            colorSchemeTag ? colorSchemeTag.slug || colorSchemeTag.name : ""
          }`}
        >
          <div
            className={`c-articleBodyContainer isSingleColumnArticle ${
              isMeteredStory ? "is-deferred" : ""
            }`}
          >
            <span data-pagezone="article-body">
              <SponsorStoryMessage
                sponsorID={sponsorSectionID}
                //  paywallStatus={paywallStatus}
                //  siteFullname={siteFullname}
              />
              <Section
                elements={filteredContentElements}
                startIndex={1}
                //  insertedSingleColAds={insertedSingleColAds}
                comesAfterDivider={infoBoxIndex && infoBoxIndex <= 1}
                liveUpdates={liveUpdates}
                noAds={noAds}
                fullWidth={true}
                isSingleColumnArticle={true}
                isMeteredStory={isMeteredStory}
                globalContent={globalContent}
              />
            </span>
            <span data-pagezone="post-article-body">
              {(!sponsorSectionID || disableSponsorRelatedBox === "true") &&
                !hideRelatedList && (
                  <div className="c-section full-width b-clear-both">
                    {/* <RelatedList
                      taxonomy={taxonomy}
                      uuid={uuid}
                      globalContent={globalContent}
                      arcSite={arcSite}
                    /> */}
                  </div>
                )}
              <div className="c-section full-width b-clear-both">
                {subtype === "NativeAdv" ? null : (
                  <BlogAuthor
                    subtype={subtype}
                    authorData={authorData}
                    key={"BlogAuthor"}
                  />
                )}
                {/* 
                {(!sponsorSectionID || disableSponsorRelatedBox === "true") &&
                  !hideRelatedList &&
                  arcSite === "ajc" && (
                    <>
                      {subtype === "NativeAdv" ? null : (
                        <EndOfStory
                          arcSite={arcSite}
                          taxonomy={taxonomy}
                          uuid={uuid}
                        />
                      )}
                    </>
                  )} */}
              </div>
              {subtype === "NativeAdv"
                ? null
                : sponsorSectionID && (
                    <SponsorRelatedBox
                      sponsorID={sponsorSectionID}
                      uuid={uuid}
                    />
                  )}
            </span>
          </div>
          {/* {recipeData && <Recipe recipes={recipeData} />} */}
        </article>
        <span data-pagezone="post-article-body">
          {/* <div className="c-pb-content">{content}</div> */}
          {!noAds && (
            <LazyLoad
              placeholder={<div className="c-placeholder-boap"></div>}
              height="100%"
              width="100%"
              once={true}
              offset={100}
            >
              {/* <Suspense fallback={<LoadingSpinner />}>
                <div className="c-boap">
                  <LazyBoap
                    isMeteredStory={false}
                    controllerClass="story-nativo_placeholder--boap"
                  />
                </div>
              </Suspense> */}
            </LazyLoad>
          )}
          {/* <BottomBanner /> */}
        </span>
      </main>
      {/* 
      // TODO: Add Wrap
      {!noHeaderAndFooter && (
        <>
          <Footer />
        </>
      )} */}
    </>
  );
};

export default Article;
