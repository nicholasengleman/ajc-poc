import "./default.scss";

const FeatureTitle = ({
  title,
  moreURL,
  isRedesign2024,
  isSlider = false,
  isRightRail,
}) => {
  const getLink = () => {
    if (moreURL.indexOf("http") === 0 || moreURL.indexOf("/") === 0) {
      // it's a properly-qualified absolute or relative url
      return moreURL;
    }
    // it's likely supposed to be an absolute url so let's make it so
    return `//${moreURL}`;
  };

  const buildTitle = () => {
    if (moreURL) {
      return (
        <a href={getLink()} className="titleURL">
          {title}
        </a>
      );
    }

    return title;
  };

  if (title) {
    return (
      <div
        className={`${
          isRedesign2024 ? "c-sectionTitle redesign2024" : "c-sectionTitle"
        } ${isSlider ? "slider-title" : ""} ${
          !isRightRail ? "c-no-rightRail" : ""
        }`}
      >
        {buildTitle()}
      </div>
    );
  }
  return null;
};

export default FeatureTitle;
