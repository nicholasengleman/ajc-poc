import { useContent } from "functions/useContent";
import ConnextFreeMessaging from "../ConnextFreeMessaging";
import "./default.scss";

const SponsorStoryMessage = async ({
  sponsorID,
  paywallStatus,
  siteFullname,
}) => {
  const data = await useContent({
    source: paywallStatus === "free" ? "site-api" : null,
    query: { section: `${sponsorID}` },
  });

  if (!sponsorID) return <ConnextFreeMessaging siteFullname={siteFullname} />;

  if (data && data.Sponsor) {
    const { disable_access_brought_to_you_by_message: sponsorMessage } =
      data.Sponsor || {};
    const { advertiser_name: sponsorName } = data.Sponsor || {};
    if (sponsorMessage === "false" && sponsorName) {
      return (
        <div className="c-freeSponsoredMsg b-margin-bottom-d30-m20">
          <h2 className="headline">{`Access to this AJC content is brought to you by our sponsor, ${sponsorName}`}</h2>
        </div>
      );
    }
    return (
      <ConnextFreeMessaging
        sponsorMessage={sponsorMessage}
        sponsorName={sponsorName}
        sponsorID={sponsorID}
      />
    );
  }

  return <ConnextFreeMessaging />;
};

export default SponsorStoryMessage;
