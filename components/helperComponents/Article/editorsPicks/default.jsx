import React from "react";
import PropTypes from "prop-types";
import { useContent } from "fusion:content";
import Headline from "../../home/Headline/Headline";
import ListItem from "../../home/ListItem/ListItem";
import "../RelatedList/default.scss";
import "../../../features/MostRead/default.scss";

const EditorsPicks = ({ uuid, section }) => {
  const data = useContent({
    source: "curious-api",
    query: {
      from: 1,
      size: 4,
      primarySize: [[500, 280]],
      secondarySize: [[110, 110]],
      secondarySizeUseAfter: 1,
      storyId: uuid,
      section_fallback: section,
    },
  });

  if (!data) return null;

  const renderList = () =>
    data
      .slice(1)
      .map((el, i) => (
        <ListItem
          key={`ListItem-${i}`}
          hidePromo={false}
          isTTDFeature={true}
          {...el}
          disableLazyLoad={false}
        />
      ));

  return (
    <>
      <div className="mostReadTitle">Keep Reading</div>
      <div className="c-ttd-feature editors-picks">
        <div className="c-homeLeadContainer left-photo-display-class one-column">
          <div className="column-1">
            {
              <Headline
                key={"story-1"}
                {...data[0]}
                isTease={true}
                disableLazyLoad={false}
              />
            }
          </div>
          <div className="column-2">{renderList()}</div>
        </div>
      </div>
    </>
  );
};

EditorsPicks.propTypes = {
  uuid: PropTypes.string,
  section: PropTypes.string,
};

EditorsPicks.defaultProps = {
  componentName: "EditorsPicks",
};

export default EditorsPicks;
