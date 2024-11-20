"use client";
import React, { useState, useRef, memo, Suspense } from "react";
import NextImage from "next/image";
import { useContent } from "functions/useContent";
import fetchEnv from "functions/environment";
import Caption from "../Caption";
import CaptionNew from "../CaptionNew";
import Overlay from "../Overlay";

// import setFocalCoords from "../../../../content/sources/helper_functions/setFocalCoords";
//import { parseResizedObject } from "../../../../content/sources/helper_functions/FetchResizedImages";
import ExpandableIcon from "resources/icons/cohortEvents/ExpandableIcon";
import Close from "resources/icons/Close";
import DownloadIcon from "resources/icons/photoWall/Download";

//import LoadingSpinner from "../loadingSpinner/default";

// import Placeholder from "./Placeholder";

import getAltText from "functions/getAltText";
import useBreakpoints from "functions/useBreakpoints";

import "./default.scss";

/**
 * Image Component
 *
 * Our core Image component for rendering images with various options and features.
 *
 * @component
 * @param {Object} props.src - The source object containing image details such as URL, caption, and credits.
 * @param {Array<Array<string>>} props.primarySize=[[[]]] - (Optional) If the image was not resized on the server and needs to be resized on the client, specifies the desired primarySize configuration for the image.
 * Can also be used to resize an image resized to a rectangle aspect ratio on the server to a square aspect ratio on the client.
 * @param {string} [props.imageMarginBottom] - (Optional) A CSS class name to add margin-bottom to the image container.
 * @param {string} [props.imageType=''] - Specifies context of the image (e.g., 'isGalleryImage', 'isHomepageImage', 'isInlineImage'). These different contexts are used for different styling and behavior.
 * @param {number} props.maxTabletViewWidth - (Optional) For images enableExpandableImage where is true, changes design of image overlay at this breakpoint.
 * @param {string} [props.teaseContentType] - (Optional) Indicates if the image is part of a teaser and what type.
 * @param {boolean} [props.imageFeature] - (Optional) If true, displays the caption element.
 * @param {string} [props.additionalClasses=''] - (Optional) Additional CSS classes to apply to the image element.
 * @param {boolean} [props.noLazyLoad=false] - (Optional) If true, disables showing the placeholder and loads the image immediately.
 * @param {number} [props.index] - (Optional) Index of the image when used in a list or gallery.
 * @param {boolean} [props.isObit=false] - (Optional) If true, applies special handling for obituary images.
 * @param {Function} [props.onClickRun] - (Optional) Callback function to execute when the image is clicked.
 * @param {Function} [props.onLoadCb=()=>{}] - (Optional) Callback function to execute when the image finishes loading.
 * @param {boolean} [props.isCaption] - (Optional) If true, displays the caption element.
 * @param {React.Component|Object} [props.cohortHeadline=null] - (Optional) <Headline> For special placement for cohort lead image treatment.
 * @returns {React.Component}
 */

const Image = async ({
  src,
  primarySize,
  imageMarginBottom,
  imageType = "",
  teaseContentType,
  imageFeature,
  additionalClasses = "",
  noLazyLoad = false,
  index,
  isObit = false,
  onClickRun,
  onLoadCb = () => {},
  isCaption = true,
  cohortHeadline = null,
}) => {
  const {
    url,
    height: originalHeight,
    width: originalWidth,
    caption,
    credits,
    alt_text: altText,
    additional_properties: additionalProperties,
    focal_point: rootFocalPoint,
    alignment,
    vanity_credits: vanityCredits,
    auth,
  } = src || {};
  let { resized_obj: resizedObject = null } = src || {};
  const arcSite = "ajc";
  const { isDesktop } = useBreakpoints();

  // TOTO: Find workaround for layout
  const layout = "";
  const env = fetchEnv();
  // TODO: Find workaround for obitsImageSandbox and obitsImageProd
  // const { obitsImageSandbox, obitsImageProd } = getProperties(arcSite);
  // const obitsCandle = `https://cloudfront-us-east-1.images.arcpublishing.com/${
  //   env === "prod" ? "" : "sandbox."
  // }ajc/${env === "prod" ? obitsImageProd : obitsImageSandbox}.jpg`;
  // if (isObit && !url) {
  //   // eslint-disable-next-line no-param-reassign
  //   src.url = obitsCandle;
  //   resizedObject = null;
  // }
  const img = useRef(null);
  const [showPlaceholder, setShowPlaceholder] = useState(!noLazyLoad);

  const isGalleryImage = imageType === "isGalleryImage";

  const [toggle, setToggle] = useState(false);

  let imgQuery = null;
  if (resizedObject) {
    img.current = resizedObject;
  }
  // TODO: Add resizer content source
  // else if (url) {
  //   const focalCoords = setFocalCoords(additionalProperties, rootFocalPoint);
  //   imgQuery = {
  //     src: url,
  //     imageSize: primarySize,
  //     focalCoords,
  //     arcSite,
  //     isGallery: isGalleryImage,
  //     auth,
  //   };
  //}

  // Backup to resize image client side if it was not resized server side.
  // const res = await useContent({
  //   source: imgQuery ? "resizer" : null,
  //   query: imgQuery,
  //   transform(data) {
  //     return parseResizedObject(data);
  //   },
  // });

  if (imgQuery && res) {
    img.current = res;
  }

  const {
    src: imgSrc = null,
    0: dtImage = {},
    1: tImage = {},
    2: mImage = {},
  } = img.current || {};
  const captionIsEmpty = !caption || caption === "";

  let mainCredit;
  let mainCreditPhotographer;
  let vanityCredit;
  let vanityCreditPhotographer;
  if (credits) {
    mainCredit =
      credits.affiliation &&
      credits.affiliation[0] &&
      credits.affiliation[0].name
        ? credits.affiliation[0].name
        : null;
    mainCreditPhotographer =
      credits.by && credits.by.length && credits.by[0] && credits.by[0].name
        ? credits.by[0].name
        : null;
  }
  if (vanityCredits) {
    vanityCredit =
      vanityCredits.affiliation &&
      vanityCredits.affiliation[0] &&
      vanityCredits.affiliation[0].name
        ? vanityCredits.affiliation[0].name
        : null;
    vanityCreditPhotographer =
      vanityCredits.by &&
      vanityCredits.by.length &&
      vanityCredits.by[0] &&
      vanityCredits.by[0].name
        ? vanityCredits.by[0].name
        : null;
  }

  let giveCredit;
  if (vanityCredit) {
    giveCredit = vanityCredit;
  } else if (vanityCreditPhotographer) {
    giveCredit = vanityCreditPhotographer;
  } else if (mainCredit) {
    giveCredit = mainCredit;
  } else if (mainCreditPhotographer) {
    giveCredit = mainCreditPhotographer;
  }

  if (!cohortHeadline) {
    giveCredit = `Credit: ${giveCredit}`;
  }

  const renderCaption = () => {
    if (teaseContentType || imageType === "isAuthorImage") {
      return null;
    }
    if (imageFeature) {
      return <Caption src={src} imageType={imageType} />;
    }
    return (
      <CaptionNew src={src} photoCredit={cohortHeadline ? giveCredit : null} />
    );
  };

  const altTextContent = getAltText(altText, caption);
  const outputCaptionAndCredit =
    imageType !== "isHomepageImage" &&
    imageType !== "isFeatureImage" &&
    imageType !== "isAuthorImage";
  const enableExpandableImage =
    imageType === "isInlineImage" && layout === "article-basic";
  const isSpecialPresentation = layout === "article-special-presentation";

  const renderDownloadButton = () => {
    if (imageType === "isPhotoWallImage") {
      return (
        <div className="download">
          <a
            target="_blank"
            rel="noreferrer"
            href={additionalProperties?.fullSizeResizeUrl}
            download
          >
            <DownloadIcon />
          </a>
        </div>
      );
    }
    return null;
  };

  const renderImgTag = () => {
    const width =
      mImage?.src?.match(/&width=(\d+)/)?.[1] ||
      imgSrc?.match(/&width=(\d+)/)?.[1] ||
      primarySize?.[0]?.[0] ||
      null;
    const height =
      mImage?.src?.match(/&height=(\d+)/)?.[1] ||
      imgSrc?.match(/&height=(\d+)/)?.[1] ||
      primarySize?.[0]?.[1] ||
      null;

    console.log("src image", src);

    return (
      <div className="lazyload-wrapper">
        {mImage.src && tImage.src && dtImage.src ? (
          <>
            <picture
              className={teaseContentType ? "tease-image" : ""}
              style={{ display: showPlaceholder ? "none" : "block" }}
            >
              <source srcSet={dtImage.src} media="(min-width: 1200px)" />
              <source srcSet={tImage.src} media="(min-width: 768px)" />
              <img
                src={mImage.src}
                alt={altTextContent}
                onLoad={() => {
                  setShowPlaceholder(false);
                  onLoadCb();
                }}
                fetchpriority={noLazyLoad ? "high" : "auto"}
                width={width}
                height={height}
              />
            </picture>
            {/* {showPlaceholder && (
              <LoadingSpinner showPlaceholder={showPlaceholder} />
            )} */}
          </>
        ) : (
          <>
            <img
              src={imgSrc}
              alt={altTextContent}
              width={width}
              height={height}
              className={`${teaseContentType ? "tease-image" : ""} ${
                width && width === height ? "square-image" : ""
              } ${additionalClasses}`}
              onClick={onClickRun}
              style={{ display: showPlaceholder ? "none" : "block" }}
              onLoad={() => {
                if (showPlaceholder) {
                  setShowPlaceholder(false);
                }
                onLoadCb();
              }}
              fetchpriority={noLazyLoad ? "high" : "auto"}
            />
            {/* {showPlaceholder && (
              <Placeholder
                showPlaceholder={showPlaceholder}
                aspectRatio={width > 0 && height > 0 ? width / height : "16/9"}
                maxWidth={width > 0 ? width : null}
                maxHeight={height > 0 ? height : null}
              />
            )} */}
          </>
        )}
      </div>
    );
  };

  if (isGalleryImage) {
    return !showPlaceholder ? (
      renderImgTag()
    ) : (
      <Suspense
        fallback={
          <>
            <div className="c-image-component">{/* <LoadingSpinner /> */}</div>
          </>
        }
      >
        {renderImgTag()}
      </Suspense>
    );
  }

  const handleOverlayToggle = () => {
    if (toggle) {
      setToggle(false);
      document.querySelector("body").style.overflow = "initial";
    } else {
      setToggle(true);
      document.querySelector("body").style.overflow = "hidden";
    }
  };

  return (
    <div
      className={`c-image-component ${toggle ? "overlay-active" : ""} ${
        imageMarginBottom || ""
      } ${alignment === "center" ? `align-${alignment}` : ""} ${
        originalHeight >= originalWidth ? "image-portrait" : "image-landscape"
      }`}
      data-index={index || null}
    >
      <div
        className={`image-component-image ${
          enableExpandableImage ? "inline" : ""
        } ${cohortHeadline ? "lead-image-article" : ""}`}
      >
        {cohortHeadline && cohortHeadline}
        <div className="enlargeImage-wrapper">
          {renderImgTag()}
          {!cohortHeadline && isCaption && (
            <p className="photo-credit-text">{giveCredit}</p>
          )}
          {enableExpandableImage && (
            <img
              src={expandIcon}
              className="image-expand"
              alt={"icon to expand image"}
              onClick={() => handleOverlayToggle()}
            />
          )}
        </div>
        {!isSpecialPresentation &&
          outputCaptionAndCredit &&
          !showPlaceholder &&
          toggle &&
          renderCaption()}
        {!showPlaceholder && renderDownloadButton()}
        {enableExpandableImage && isDesktop && (
          <>
            <img
              src={closeIcon}
              className="image-close"
              alt="icon to close expanded image"
              onClick={() => handleOverlayToggle()}
            />
            <Overlay
              toggle={toggle}
              setToggle={setToggle}
              onClickCb={() => handleOverlayToggle()}
            />
          </>
        )}
      </div>
      {isSpecialPresentation && !captionIsEmpty && (
        <div className="sp-caption">{caption}</div>
      )}
      {!isSpecialPresentation &&
        outputCaptionAndCredit &&
        !cohortHeadline &&
        isCaption && <p className="photo-credit-text">{giveCredit}</p>}
      {!isSpecialPresentation &&
        outputCaptionAndCredit &&
        !showPlaceholder &&
        renderCaption()}
    </div>
  );
};

export default memo(Image);
