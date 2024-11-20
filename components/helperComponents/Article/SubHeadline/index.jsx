/*  /components/features/article/subheadline/default.jsx */

import "./style.scss";

const SubHeadline = ({ subheadlines }) => {
  const { basic } = subheadlines || {};
  if (!basic) return null;

  return (
    <div className="subheadline-content">
      <span>{basic}</span>
    </div>
  );
};

export default SubHeadline;
