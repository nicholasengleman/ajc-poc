import React from "react";

const Header = ({ src }) => {
  const { content, level } = src;

  const CustomTag = `h${level}`;
  return (
    <CustomTag
      className={`h${level}-heading b-margin-bottom-d40-m20`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default Header;
