import { useContent } from "functions/useContent";
import checkSponsor from "./checkSponsor";

const getSponsorData = async (sections, onArticlePage = false) => {
  const { sponsorSectionID, sponsorName } = checkSponsor(sections);

  // return null if the sponsor section ID doesn't exist, to prevent unnecessary site-api calls
  if (!sponsorSectionID) return null;

  const siteData = await useContent({
    source: "site-api",
    query: { section: sponsorSectionID || null },
  });

  const { Sponsor: sponsorOld = null, sponsor = null } = siteData || {};
  const {
    disable_advertiser_content_label: disableAdOld,
    disable_sponsor_related_box: disableSponsorRelatedBoxOld = "",
  } = sponsorOld || {};
  const {
    disable_advertiser_content_label: disableAd,
    disable_sponsor_related_box: disableSponsorRelatedBox,
  } = sponsor || {};

  let enableSponsorAd =
    sponsorOld && (disableAdOld === "false" || !disableAdOld);
  if (!sponsorOld) {
    enableSponsorAd = disableAd === "false" || !disableAd;
  }

  /* for use only on article-basic */
  if (onArticlePage) {
    if (!sponsorSectionID) {
      return {
        sponsorName: null,
        disableSponsorRelatedBox:
          disableSponsorRelatedBox || disableSponsorRelatedBoxOld,
      };
    }

    if (enableSponsorAd) {
      return {
        sponsorName: sponsorName || null,
        disableSponsorRelatedBox:
          disableSponsorRelatedBox || disableSponsorRelatedBoxOld,
      };
    }
  }

  if (disableAdOld === "false" || disableAd === "false") {
    return sponsorName;
  }

  return null;
};

export default getSponsorData;
