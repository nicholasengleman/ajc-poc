/*  /components/_helper_components/article/contentElements/components/list/default.jsx */
import SubList from ".";
import { safeHtml } from "functions/stringUtils";

const List = (props) => {
  const { src = {}, childList = false } = props;
  const { items = [], list_type: listType } = src;
  const isUnorderedList = listType === "unordered";
  if (!items.length) return null;

  const itemsOutput = () =>
    items.map((e, i) => {
      const { type, content } = e;
      if (type === "text" && content !== "" && content !== "<br/>") {
        return (
          <li
            key={`li-${i}`}
            dangerouslySetInnerHTML={{ __html: safeHtml(content) }}
          ></li>
        );
      }
      // eslint-disable-next-line react/jsx-key
      return <SubList src={e} childList={true} key={i} />;
    });

  return (
    <div className={`list ${childList ? "" : "b-margin-bottom-d40-m20"}`}>
      {isUnorderedList && <ul>{itemsOutput()}</ul>}
      {!isUnorderedList && <ol>{itemsOutput()}</ol>}
    </div>
  );
};

export default List;
