/* eslint-disable react/no-unknown-property */
import React, { useState } from "react";
import createID from "functions/createID";
import "./default.scss";

// This Caption is only used on PB pages(but not special presentation pages)

const Caption = ({ src, isLeadVideo, videoCaption, imageType }) => {
  const { caption, credits } = src || null;
  const [toggleButton, setToggle] = useState(false);
  const captionID = `captionID-${createID()}`;
  const appContext = useAppContext();
  const { layout } = appContext;

  const isSpecialPresentation = layout === "article-special-presentation";

  const toggle = (e) => {
    e.preventDefault();
    if (e.type === "click") {
      setToggle(!toggleButton);
    } else if (e.type === "blur") {
      setToggle(false);
    }
  };

  let captionContent = caption || "";
  if (isLeadVideo) {
    captionContent = videoCaption || "";
  }

  let mainCredit;
  let secondaryCredit;
  if (credits) {
    mainCredit =
      credits.affiliation &&
      credits.affiliation[0] &&
      credits.affiliation[0].name
        ? credits.affiliation[0].name
        : null;
    secondaryCredit =
      credits.by && credits.by.length && credits.by[0] && credits.by[0].name
        ? credits.by[0].name
        : null;
  }

  let giveCredit = "";
  if (!isLeadVideo) {
    if (mainCredit) {
      if (imageType !== "isLeadImage") {
        giveCredit = `Credit: ${mainCredit}`;
      }
    } else if (secondaryCredit) {
      giveCredit = `Credit: ${secondaryCredit}`;
    }
  }
  if (isLeadVideo) {
    if (mainCredit) {
      giveCredit = `Credit: ${mainCredit}`;
    }
  }

  return (
    <>
      {!isSpecialPresentation ? (
        <div
          className={`c-caption ${toggleButton ? "is-active" : ""}`}
          id={captionID}
          on={`tap:${captionID}.toggleClass(class='is-active')`}
          role="button"
          tabIndex="0"
        >
          <div
            tabIndex="1"
            className="photo-caption-btn"
            onClick={toggle}
            onBlur={toggle}
          >
            <span>Caption</span>
          </div>
          <div className="photo-caption">
            <div className="photo-caption-text">
              {captionContent.replace(/\n|\r/g, " ")}
            </div>
            <p className="photo-credit-text">
              {giveCredit.replace(/\n|\r/g, " ")}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Caption;
