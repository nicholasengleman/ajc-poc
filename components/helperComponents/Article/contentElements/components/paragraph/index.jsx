"use client";

import React, { useEffect } from "react";
import { safeHtml } from "functions/stringUtils";
import "./default.scss";

const Paragraph = ({ src, index, replacementData }) => {
  let { content } = src;
  if (content && Array.isArray(replacementData) && replacementData.length) {
    replacementData.forEach((e) => {
      const { storyText, storyLink } = e;
      const trimmedStoryText = storyText?.trim();
      if (content.includes(trimmedStoryText)) {
        // eslint-disable-next-line no-param-reassign
        content = content.replace(
          trimmedStoryText,
          `<a href=${storyLink}>${trimmedStoryText}</a>`
        );
      } else if (trimmedStoryText?.indexOf("*") !== -1) {
        const split = trimmedStoryText.split("*");
        const regexObj = new RegExp(`(?<![<>])${split[0]}\\S*\\d(?![<>])`, "g");

        // Picking the matchedText from content
        const matchedText = content.match(regexObj);
        if (Array.isArray(matchedText)) {
          const uniqueMatchedText = [...new Set(matchedText)];
          uniqueMatchedText.forEach((text) => {
            if (storyLink.indexOf("*") === -1) return;
            let linkURL = storyLink.replace("*", split[0]);
            linkURL = linkURL.replace("**", text.replace(split[0], ""));
            // eslint-disable-next-line no-param-reassign
            content = content.replace(
              new RegExp(text, "g"),
              `<a href=${linkURL}>${text}</a>`
            );
          });
        }
      }
    });
  }
  const { alignment } = src;

  const paragraphRef = React.useRef(null);

  useEffect(() => {
    if (src.subType === "NativeAdv" && paragraphRef.current) {
      const links = paragraphRef.current.querySelectorAll("a");
      links.forEach((link) => {
        link.setAttribute("rel", "sponsored");
      });
    }
  }, [src.subType]);

  return (
    <p
      ref={paragraphRef}
      className={`story-text ${alignment === "center" ? "text-center" : ""}`}
      data-index={index || null}
      dangerouslySetInnerHTML={{
        __html: safeHtml(content, {
          whiteList: {
            p: [],
            span: ["class", "style"],
            a: ["href", "data-*", "target", "class", "on"],
            br: [],
            b: [],
            i: [],
            u: [],
            strong: [],
          },
        }),
      }}
    />
  );
};

export default Paragraph;
