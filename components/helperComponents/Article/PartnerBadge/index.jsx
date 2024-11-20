import React, { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import LoadingSpinner from "../../global/loadingSpinner/default";
import "./default.scss";

const LazyImageSimple = lazy(() => import("../../global/imageSimple/default"));

const PartnerBadge = ({ sections }) => {
  const arcSite = "ajc";

  //  const { partnerBadgeLogo, websiteURL } = getProperties(arcSite);

  return sections.map((section) => {
    const { path } = section || {};
    const isPartner = path === "/partner";
    if (isPartner) {
      return (
        <a
          href={`${websiteURL}/partner`}
          key={path}
          className="c-story-partnerBadge"
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
            <LazyImageSimple src={partnerBadgeLogo} alt="Partner Badge Logo" />
          </Suspense>
        </a>
      );
    }
    return null;
  });
};

PartnerBadge.static = true;

PartnerBadge.propTypes = {
  sections: PropTypes.array,
};

export default PartnerBadge;
