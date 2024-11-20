import { useContent } from "hooks/useContent";
import ListItem from "../../home/ListItem/ListItem";
import filterDuplicateStory from "../../../layouts/_helper_functions/filterDuplicateStory";
import filterByPrimarySection from "../../../../content/sources/helper_functions/filterByPrimarySection";
import truncateHeadline from "../../../layouts/_helper_functions/homepage/truncateHeadline";
import "../../../features/MostRead/default.scss";
import "./default.scss";

/**
 * RelatedList Component
 *
 * Renders a list of related stories or news items based on the provided taxonomy and content data.
 *
 * @component
 * @param {Object} props
 * @param {Object} [props.taxonomy] - The taxonomy object, containing information about the primary section of the content.
 * @param {string} [props.uuid] - The unique identifier for the current story to avoid duplication in related stories.
 * @param {Object} [props.globalContent] - The global content object, typically containing related content to be displayed in the list.
 * @param {string} [props.arcSite='ajc'] - The site identifier, used to configure content queries based on the site context.
 * @param {boolean} [props.showPreview=true] - Determines whether a preview image or video should be displayed for each list item.
 * @param {boolean} [props.showTitle=true] - Controls whether the title "Related" or "In Other News" is displayed above the list of stories.
 * @param {number} [props.maxElements=5] - The maximum number of elements or stories to display in the list.
 *
 * @returns {React.Component}
 */

const RelatedList = async ({
  taxonomy,
  uuid,
  globalContent,
  arcSite,
  showPreview = true,
  showTitle = true,
  maxElements = 5,
}) => {
  if (arcSite === "ajc") {
    let storyIds = "";
    const { related_content: relatedContent } = globalContent || {};
    const { basic: basicData } = relatedContent || {};

    if (basicData) {
      basicData.forEach((e) => {
        const { _id: id, referent } = e || {};
        const { type } = referent || {};
        if (type !== "image") {
          storyIds += `${id},`;
        }
      });
      // remove the last comma
      storyIds = storyIds.slice(0, -1);
    }

    const data = await useContent({
      source: storyIds ? "related-content-api" : null,
      query: {
        storyIds,
        arcSite,
      },
    });

    if (!data) return null;

    const mappedList = data?.content_elements?.map((el, i) => {
      const { _id: id } = el;
      if (i < maxElements) {
        return (
          <ListItem
            key={id}
            {...el}
            listPage={true}
            showPreview={showPreview}
          />
        );
      }
      return null;
    });

    return (
      <div className="c-relatedList">
        <div className="c-mostRead">
          {showTitle && <div className="mostReadTitle">Related</div>}
          <div className="c-homeLeadContainer left-photo-no-photo-display-class one-column">
            <div className="column-1">{mappedList}</div>
          </div>
        </div>
      </div>
    );
  }
  const { primary_section: primarySection } = taxonomy || {};
  const { path, referent } = primarySection || {};
  const { id: referentId } = referent || {};
  let contentData = null;
  let primaryData = null;
  let finalReferentId;
  let counter = 0;

  if (referentId) {
    [, finalReferentId] = referentId.split("/");
  }

  const formattedPath = path ? path.substring(1) : finalReferentId || null;
  const data = useContent({
    source: "search-api",
    query: {
      published: true,
      section: formattedPath,
      sort: true,
      size: 15,
    },
  });

  if (data && data.content_elements && data.content_elements.length > 1) {
    contentData = filterDuplicateStory(data.content_elements, uuid);
    primaryData = filterByPrimarySection(contentData, formattedPath);
  } else {
    return null;
  }

  return (
    <>
      {primaryData.length > 1 && (
        <div className="c-mostRead">
          <div className="mostReadTitle">In Other News</div>
          <div className="mostReadList">
            {primaryData &&
              primaryData.map((el) => {
                const {
                  headlines = {},
                  canonical_url: canonicalUrl,
                  website_url: websiteUrl,
                } = el;
                const relativeURL = websiteUrl || canonicalUrl;
                const { basic: title } = headlines;
                if (!relativeURL || !title) return null;

                if (counter < 5) {
                  counter += 1;
                  return (
                    <a
                      key={`Headline-${counter}`}
                      href={relativeURL}
                      target="_self"
                    >
                      <div className="mostReadRanking">{counter}</div>
                      <div></div>
                      <div className="mostReadHeadline">
                        {truncateHeadline(title)}
                      </div>
                    </a>
                  );
                }
                return null;
              })}
          </div>
        </div>
      )}
    </>
  );
};

RelatedList.propTypes = {
  taxonomy: PropTypes.object,
  uuid: PropTypes.string,
  globalContent: PropTypes.object,
  arcSite: PropTypes.string,
  showPreview: PropTypes.bool,
  showTitle: PropTypes.bool,
  maxElements: PropTypes.number,
};

RelatedList.defaultProps = {
  componentName: "RelatedList",
  arcSite: "ajc",
};

export default RelatedList;
