import { creditParser, handleAuthors, handleOrganization } from "./utils";
import getSponsorData from "functions/getSponsorData";
import "./default.scss";

const Byline = async ({ by = [], sections, excludeOrg = false }) => {
  const sponsorContentLabel = await getSponsorData(sections);
  const finalizeByline = (authors = []) => {
    const authorsArray = authors;
    if (excludeOrg) {
      // had to go this route because somehow "location" (from author service ANS) comes through as "org" in story data
      authorsArray.map((author, i) => {
        delete authorsArray[i].org;
        return authorsArray[i];
      });
    }
    // we still need this as well, since `handleOrganization` will re-set a fallback value for `org` which we don't want
    const authorData = excludeOrg
      ? authorsArray
      : handleOrganization(authorsArray);
    return handleAuthors(authorData);
  };

  if (sponsorContentLabel)
    return <div className="byline ">By {sponsorContentLabel}</div>;
  return by.length ? (
    <div className="byline ">{finalizeByline(by.map(creditParser))}</div>
  ) : null;
};

export default Byline;
