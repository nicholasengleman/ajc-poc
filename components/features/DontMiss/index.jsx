import { useContent } from "hooks/useContent";
import FeatureTitle from "components/helperComponents/FeatureTitle";
import "./default.scss";

const DontMiss = async ({ customFields = {} }) => {
  const arcSite = "ajc";
  const { contentSource, title = "", isRedesign2024 } = customFields;
  const { contentSourceType, ...contentSourceQuery } = contentSource;
  const { size = 6 } = contentSourceQuery;

  const data = await useContent({
    source: contentSourceType,
    query: {
      ...contentSourceQuery,
      arcSite,
    },
    transform: (transformData) => {
      if (!Array.isArray(transformData)) {
        if (Array.isArray(transformData?.content_elements)) {
          return transformData.content_elements;
        }
      }
      return transformData;
    },
  });

  if (Array.isArray(data)) {
    return (
      <div
        className={`c-dontMiss ${isRedesign2024 ? "redesign2024" : ""}`}
        data-sectiontitle={`${title || "Trending"}`}
      >
        <FeatureTitle title={title} />
        <div className="c-homeListContainer no-photo-display-class dontMissFeature">
          {data.map((el, i) => {
            if (i < size) {
              return (
                <a className="headline" key={i} href={el.canonical_url}>
                  {el.headlines.basic}
                </a>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }
  return null;
};

export default DontMiss;
