import computeTimeStamp from "./_helper_functions/computeTimeStamp";
import "./default.scss";

const TimeStamp = ({
  firstPublishDate,
  displayDate,
  isHideTimestampTrue,
  isHyperlocalContent,
  isTease = false,
  addDivider = false,
  isSearchPage = false,
}) => {
  let pageType = "normal";

  if (isTease) pageType = "tease";

  if (isSearchPage) pageType = "search";

  const timeStamp = computeTimeStamp(
    firstPublishDate,
    displayDate,
    isHideTimestampTrue,
    isHyperlocalContent,
    pageType
  );

  if (timeStamp === null) return null;

  return (
    <>
      {addDivider && <div className="divider"></div>}
      <span
        className={isTease ? "isTease article-timestamp" : "article-timestamp"}
      >
        {timeStamp}
      </span>
    </>
  );
};

export default TimeStamp;
