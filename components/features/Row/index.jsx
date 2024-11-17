import FeatureRender from "../FeatureRender";
import "./styles.scss";

const Row = ({ data }) => {
  const { mainContent, rightRail } = data || {};

  return (
    <div className="row c-sectionHome">
      <div className="c-contentElements">
        <FeatureRender data={mainContent} />
      </div>
      <div className="c-rightRail ">
        <FeatureRender data={rightRail} />
      </div>
    </div>
  );
};

export default Row;
