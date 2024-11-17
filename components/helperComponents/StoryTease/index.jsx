import HeadlineLabel from "../HeadlineLabel";
import TimeStamp from "../TimeStamp";
import handleSiteName from "@/functions/handleSiteName";
import getHeadlineLabel from "@/functions/getHeadlineLabel";
import truncateSentences from "@/functions/truncateSentences";
import VideoLength from "../VideoLength";
import "./default.scss";

/**
 * StoryTease Component
 *
 * This component renders a story tease with an optional image, headline, description, and additional metadata such as the publish date and video duration. It supports various customization options, including text styling and truncating descriptions.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {Object} props.story - The story data used to populate the component.
 * @param {string} [props.story.headlines.basic] - The basic headline of the story.
 * @param {string} [props.story.description.basic] - The basic description of the story.
 * @param {number} [props.story.duration] - The video duration (if the story contains video content).
 * @param {Object} [props.story.label] - The story label used to customize the headline.
 * @param {string} [props.story.display_date] - The display date of the story.
 * @param {string} [props.story.publish_date] - The first publish date of the story.
 * @param {string} [props.story.canonical_url] - The canonical URL of the story.
 * @param {string} [props.story.canonical_website] - The canonical website of the story.
 * @param {string} [props.story.website_url] - The URL of the story on the current website.
 * @param {Object} [props.story.teaseImageObject] - The image object associated with the story tease.
 * @param {string} [props.story.type] - The type of the story (e.g., 'story', 'video', etc.).
 * @param {boolean} [props.largeText=false] - (Optional) If true, applies large text styling to the component.
 * @param {boolean} [props.boldText=false] - (Optional) If true, applies bold text styling to the component.
 * @param {boolean} [props.hideDescription=false] - (Optional) If true, hides the description of the story tease.
 * @param {boolean} [props.isDisplayImage=false] - (Optional) If true, displays the story's image in the tease.
 * @param {number} [props.maxCharacters=175] - (Optional) The maximum number of characters to display for the description before truncation.
 * @param {boolean} [props.displayVideoDuration=false] - (Optional) If true, displays the video duration on the story's image if applicable.
 * @param {boolean} [props.isTease=false] -
 *
 * @returns {React.Component} A React component that renders a story tease with customizable options for text, images, and metadata.
 */

const StoryTease = ({
  story,
  largeText,
  boldText,
  hideDescription,
  isDisplayImage,
  maxCharacters = 175,
  displayVideoDuration,
  isTease = true,
}) => {
  const {
    headlines,
    description,
    duration,
    label,
    display_date: displayDate,
    publish_date: firstPublishDate,
    canonical_url: canonicalUrl,
    canonical_website: canonicalSite,
    website_url: websiteUrl,
    teaseImageObject,
    type,
  } = story || {};
  const fetch = "sandbox";
  const arcSite = "ajc";

  const { headlineLabel, headlineWithoutLabel } = getHeadlineLabel(
    headlines?.basic,
    label
  );
  const relativeURL = websiteUrl || canonicalUrl || "/";
  const finalURL =
    canonicalSite && canonicalSite !== arcSite && arcSite === "ajc"
      ? `//${fetch !== "prod" ? "sandbox" : "www"}.${handleSiteName(
          canonicalSite
        )}.com${relativeURL}`
      : relativeURL;

  return (
    <div
      className={`c-story-tease ${largeText ? "large-text" : ""} ${
        boldText ? "bold-text" : ""
      } ${hideDescription ? "hide-description" : ""} ${
        displayVideoDuration ? "display-video-duration" : ""
      }`}
    >
      {isDisplayImage ? (
        <a
          href={finalURL}
          className={`story-image ${
            type === "video" ? "story-image-video" : ""
          }`}
        >
          {/* <Image
            src={teaseImageObject}
            imageType='isFeatureImage'
            primarySize={[[620, 420]]}
          /> */}
          {displayVideoDuration && <VideoLength duration={duration} />}
        </a>
      ) : (
        ""
      )}
      <div className="story-info">
        <HeadlineLabel headlineLabel={headlineLabel} />
        <a
          className={`headline ${
            type !== "story" ? `story-tease-${type}` : ""
          }`}
          href={finalURL}
        >
          <h3>{headlineWithoutLabel}</h3>
        </a>
        {description?.basic && (
          <p className="description">
            {truncateSentences(description?.basic, { maxCharacters })}
          </p>
        )}
        <TimeStamp
          firstPublishDate={firstPublishDate}
          displayDate={displayDate}
          isTease={isTease}
        />
      </div>
    </div>
  );
};

export default StoryTease;
