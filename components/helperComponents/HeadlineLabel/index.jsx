import "./default.scss";

const HeadlineLabel = ({ headlineLabel, isRedesign2024 }) => {
  if (headlineLabel) {
    return (
      <div
        className={`${
          isRedesign2024 ? "c-headline-label-2024" : ""
        }c-headline-label`}
      >
        {headlineLabel}
      </div>
    );
  }

  return null;
};

export default HeadlineLabel;
