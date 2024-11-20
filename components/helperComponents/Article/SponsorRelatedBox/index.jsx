import { useContent } from "functions/useContent";
import "./default.scss";

const SponsorRelatedBox = async ({ sponsorID, uuid }) => {
  const arcSite = "ajc";

  const stories = await useContent({
    source: sponsorID ? "sponsored-stories" : null,
    query: {
      section: sponsorID,
      arcSite,
      excludeTheseStoryIds: [uuid],
    },
  });

  if (stories?.length > 0) {
    return (
      <div className={"c-sponsor-box"}>
        <p className="title">More In This Series</p>
        <ul className={"sponsor-content"}>
          {stories.map((el, i) => {
            if (i < 4) {
              return (
                <li key={i} className="sponsor-item">
                  <a href={el.canonical_url}>
                    <h3>{el.headlines.basic}</h3>
                  </a>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
    );
  }
  return null;
};

export default SponsorRelatedBox;
