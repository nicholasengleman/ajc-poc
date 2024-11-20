import List from "../list/index.jsx";
import Paragraph from "../paragraph/index.jsx";

const Blockquote = ({ contentElements, citation }) => (
  <div className="blockquote b-margin-bottom-d40-m20">
    {contentElements.map((el, index) => {
      const { content: contentText } = el;
      let convertedText;
      switch (el.type) {
        case "list":
          return <List key={`blockquote-${index}`} src={el} />;
        case "text":
          // we run some conversions to replace stringified code with actual tags, and fancy quotes with standard
          convertedText = contentText.replace(/&lt;/g, "<");
          convertedText = convertedText.replace(/&gt;/g, ">");
          convertedText = convertedText.replace(/”/g, '"');
          convertedText = convertedText.replace(/’/g, "'");
          return (
            <Paragraph
              key={`blockquote-${index}`}
              src={{ content: convertedText }}
            />
          );
        default:
          return null;
      }
    })}
    {citation && citation.content && (
      <div className="blockquote-citation">- {citation.content}</div>
    )}
  </div>
);

export default Blockquote;
