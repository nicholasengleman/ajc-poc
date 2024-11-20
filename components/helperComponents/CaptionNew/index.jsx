/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect, useRef } from "react";
import createID from "functions/createID";
import LeftArrowIcon from "resources/icons/slider/LeftArrowIcon";
import "./default.scss";

// This Caption is only used on Story pages

const CaptionNew = ({ src, videoCaption, photoCredit = null }) => {
  const { caption } = src || null;
  const [displayFullCredit, setDisplayFullCredit] = useState(false);
  const [displayToggle, setDisplayToggle] = useState(false);
  const captionID = `captionID-${createID()}`;
  // TODO: Get workaround for layout
  const layout = "";
  const captionRef = useRef(null);

  const isSpecialPresentation = layout === "article-special-presentation";

  const handleDisplayFullCredit = (e) => {
    e.preventDefault();

    if (e.type === "click") {
      setDisplayFullCredit(!displayFullCredit);
    } else if (e.type === "blur") {
      setDisplayFullCredit(false);
    }
  };

  const captionContent = caption || videoCaption;

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach(({ target: { clientHeight, scrollHeight } }) => {
        const adjustedClientHeight = clientHeight + 5; // we buffer by 5 because some iOS devices were showing the more button when the caption fit, due to the scrollHeight being 1px larger than clientHeight
        if (scrollHeight > adjustedClientHeight) {
          setDisplayToggle(true);
        } else if (scrollHeight <= adjustedClientHeight && !displayFullCredit) {
          setDisplayToggle(false);
        }
      });
    });

    if (captionRef.current) {
      resizeObserver.observe(captionRef.current);
    }

    return () => {
      if (captionRef.current) {
        resizeObserver.unobserve(captionRef.current);
      }
    };
  }, [captionContent, displayFullCredit]);

  if (!captionContent && !photoCredit) {
    return null;
  }

  return (
    <>
      {!isSpecialPresentation ? (
        <div
          className={`c-caption-new ${
            displayFullCredit ? "text-all" : "text-preview"
          }`}
          id={captionID}
          tabIndex="0"
        >
          <div ref={captionRef} className="photo-caption-text">
            {captionContent}
            {photoCredit && <span>{` (${photoCredit})`}</span>}
          </div>
          {displayToggle && (
            <button
              className="btn-expand"
              onClick={(e) => handleDisplayFullCredit(e)}
            >
              <LeftArrowIcon /> {displayFullCredit ? "Less" : "More"}
            </button>
          )}
        </div>
      ) : null}
    </>
  );
};

export default CaptionNew;
