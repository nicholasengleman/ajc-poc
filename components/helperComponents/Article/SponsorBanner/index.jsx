/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import PropTypes from "prop-types";
import { useContent } from "functions/useContent";
import "./default.scss";

const SponsorBanner = async ({ sponsorID, isStoryPage = false }) => {
  let openNewTabTrue;

  const data = await useContent({
    source: sponsorID ? "site-api" : null,
    query: { section: `${sponsorID}` },
  });

  if (data && (data.Sponsor || data.sponsor)) {
    const {
      sponsor_desktop_banner: sectionDesktopBanner,
      sponsor_mobile_banner: sectionMobileBanner,
      sponsor_url: bannerURL,
      sponsor_url_open_new_tab: openNewTab,
      sponsorseries_storypage_desktop_banner: seriesDesktopBanner,
      sponsorseries_storypage_mobile_banner: seriesMobileBanner,
    } = data.Sponsor || data.sponsor;

    const mobileBanner = isStoryPage ? seriesMobileBanner : sectionMobileBanner;
    const desktopBanner = isStoryPage
      ? seriesDesktopBanner
      : sectionDesktopBanner;
    const checkForMobileBanner = mobileBanner || desktopBanner;

    const imgTag = () => (
      <picture>
        <source media="(max-width: 767px)" srcSet={checkForMobileBanner} />
        <source media="(min-width: 768px)" srcSet={desktopBanner} />
        <img
          src={desktopBanner}
          alt="Sponsor banner"
          className="c-sponsorImg"
        />
      </picture>
    );
    openNewTabTrue = openNewTab === "true";
    if (desktopBanner) {
      return (
        <div
          className={`c-sponsorBanner ${
            isStoryPage ? "story-sponsor-banner" : ""
          }`}
        >
          {bannerURL ? (
            <a
              href={bannerURL}
              className="c-sponsorUrl"
              rel="noopener noreferrer"
              target={openNewTabTrue ? "_blank" : "_self"}
            >
              {imgTag()}
            </a>
          ) : (
            imgTag()
          )}
        </div>
      );
    }
  }
  return null;
};

export default SponsorBanner;
