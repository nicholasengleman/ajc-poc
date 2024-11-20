import React, { lazy, Suspense } from "react";
import getProperties from "fusion:properties";
import checkTags from "functions/checkTags";
import LoadingSpinner from "../loadingSpinner/default";
import "./default.scss";

const LazyImageSimple = lazy(() => import("../imageSimple/default"));

const ContributorBadge = ({ tags, useWhiteLogos, staffBio }) => {
  const hyperlocalTags = getProperties().hyperlocalTags.filter((tag) => {
    if (tag !== "community contributor") {
      return tag;
    }
    return null;
  });

  function getContributorProps() {
    switch (checkTags(tags, hyperlocalTags)) {
      case "alpharetta":
        return {
          link: "/neighborhoods/alpharetta",
          image: `/resources/images/contributors/alpharetta${
            useWhiteLogos ? "-white" : ""
          }.png`,
        };
      case "roswell":
        return {
          link: "/neighborhoods/roswell",
          image: `/resources/images/contributors/roswell${
            useWhiteLogos ? "-white" : ""
          }.png`,
        };
      case "sandy springs":
        return {
          link: "/neighborhoods/sandy-springs",
          image: `/resources/images/contributors/sandy_springs${
            useWhiteLogos ? "-white" : ""
          }.png`,
        };
      case "dunwoody":
        return {
          link: "/neighborhoods/dunwoody",
          image: `/resources/images/contributors/dunwoody${
            useWhiteLogos ? "-white" : ""
          }.png`,
        };
      default:
        return {
          type: "default",
          link: "/neighborhoods/",
          image: "/resources/images/contributors/community.png",
        };
    }
  }
  if (staffBio) {
    if (checkTags(tags, hyperlocalTags)) {
      return (
        <a
          href={`${getContributorProps().link}`}
          className="c-contributorBadge staff-bio b-margin-bottom-d40-m20"
        >
          <Suspense
            fallback={
              <>
                <div className="c-image-component">
                  <LoadingSpinner />
                </div>
              </>
            }
          >
            <LazyImageSimple
              src={getContributorProps().image}
              alt="Contributor Badge Logo"
            />
          </Suspense>
        </a>
      );
    }
  }
  if (checkTags(tags, "community contributor")) {
    return (
      <a href={`${getContributorProps().link}`} className="c-contributorBadge">
        <Suspense
          fallback={
            <>
              <div className="c-image-component">
                <LoadingSpinner />
              </div>
            </>
          }
        >
          <LazyImageSimple
            src={getContributorProps().image}
            alt="Contributor Badge Logo"
          />
        </Suspense>
      </a>
    );
  }
  return null;
};

ContributorBadge.propTypes = {
  tags: PropTypes.array,
  staffBio: PropTypes.bool,
  useWhiteLogos: PropTypes.bool,
  tease: PropTypes.bool,
};

export default ContributorBadge;
