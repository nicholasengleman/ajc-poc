import React, { Fragment, lazy, Suspense } from "react";
import { useContent } from "functions/useContent";
import BlockQuote from "./components/blockQuote";
// import GalleryEmbed from "./components/gallery/default";
// import HTML from "./components/html/default";
import Image from "components/helperComponents/Image";
import List from "./components/list";
import Paragraph from "./components/paragraph";
// import Oembed from "./components/social_url/default";
import Header from "./components/header/default";
import Divider from "./components/divider/default";
// import Table from "./components/table/default";
// import AlignedElements from "./components/alignedElements/default";
// import LiveCenter from "./components/LiveCenter/LiveCenter";
// import Correction from './components/correction/default';
// import convertCsvToJson from "../../global/utils/convertCsvToJson";
// import LoadingSpinner from "../../global/loadingSpinner/default";

// const LazyVideo = lazy(() => import("../../global/video/default"));
// const LazyInterstitialLink = lazy(() =>
//   import("./components/interstitial_link/default")
// );

const ContentElements = async ({
  contentElements,
  startIndex = 0,
  noLazyLoadImages = false,
  globalContent,
}) => {
  // const { inlineVideoPlayerRules, maxTabletViewWidth } = getProperties();
  const arcSite = "ajc";

  const { taxonomy } = globalContent || {};
  const { tags = [] } = taxonomy || {};

  const composerId =
    tags.length &&
    tags
      .find((tag) => tag?.text?.startsWith("RunAutoLink_"))
      ?.text.split("_")[1];

  const remoteData = await useContent({
    source: composerId ? "content-preview-api" : null,
    query: {
      id: composerId,
      arcSite,
      published: false,
    },
  });

  let replacementData;
  const trimmedRemoteData = remoteData?.content_elements[0]?.content?.trim();
  if (trimmedRemoteData && trimmedRemoteData.indexOf("[") !== 0) {
    replacementData = convertCsvToJson(trimmedRemoteData);
  }

  return (
    <div className="c-contentElements" data-start-index={startIndex}>
      {contentElements.map((element, i) => {
        const count = i + startIndex + 1;
        const { type } = element;
        switch (type) {
          // case "div":
          //   // returns inserted ads
          //   return element;
          // case "quote":
          //   return (
          //     <BlockQuote
          //       contentElements={element.content_elements}
          //       citation={element.citation}
          //       index={count}
          //       key={`BlockQuote-${i}`}
          //     />
          //   );
          case "correction":
            // See APD-451, this element will be worked at a later time.
            // return <Correction src={element} key={`Correction-${i}`} />;
            return null;
          // case "gallery":
          //   return (
          //     <GalleryEmbed src={element} key={`Gallery-${i}`} index={count} />
          //   );
          // case "raw_html":
          //   return <HTML src={element} key={`Raw_HTML-${i}`} index={count} />;
          // case "header":
          //   return <Header src={element} key={`Header-${i}`} />;
          case "image":
            // a height of 0 makes the height proportional to the width
            return (
              <Image
                width={800}
                src={element}
                imageType="isInlineImage"
                imageMarginBottom="b-margin-bottom-d40-m20"
                //  maxTabletViewWidth={maxTabletViewWidth}
                key={`Image-${i}`}
                index={count}
                noLazyLoad={noLazyLoadImages}
                alt="story image"
              />
            );
          case "text":
            return (
              <Paragraph
                src={element}
                key={`Paragraph-${i}`}
                index={count}
                replacementData={replacementData}
              />
            );
          // case "interstitial_link":
          //   return (
          //     <LazyInterstitialLink
          //       src={element}
          //       key={`InterstitialLink-${i}`}
          //       index={count}
          //     />
          //   );
          // case "list":
          //   return <List src={element} key={`List-${i}`} index={count} />;
          // case "divider":
          //   return <Divider key={`Divider-${i}`} />;
          // case "oembed_response":
          //   return <Oembed src={element} key={`Oembed-${i}`} index={count} />;
          // case "table":
          //   return <Table src={element} key={`Table-${i}`} index={count} />;
          // case "video":
          //   return (
          //     <Suspense
          //       fallback={
          //         <>
          //           <div className="c-video-component">
          //             <LoadingSpinner />
          //           </div>
          //         </>
          //       }
          //     >
          //       <LazyVideo
          //         src={element}
          //         isStoryVideo
          //         isInlineVideo
          //         maxTabletViewWidth={maxTabletViewWidth}
          //         inlineVideoPlayerRules={inlineVideoPlayerRules}
          //         key={`Video-${i}`}
          //         index={count}
          //       />
          //     </Suspense>
          //   );
          // case "aligned_elements":
          //   return (
          //     <AlignedElements
          //       key={`AlignedElement-${i}`}
          //       src={element}
          //       index={count}
          //     />
          //   );
          // case "custom_embed":
          //   switch (element.subtype) {
          //     case "Live Center":
          //       return (
          //         <LiveCenter key={`${type}_${i}`} embed={element.embed} />
          //       );
          //     default:
          //       return null;
          //   }
          case "reference":
            return null;
          case "link_list":
            return null;
          case "jsx":
            return element.content;
          // default:
          //   return <Fragment key={i}>{element}</Fragment>;
        }
      })}
    </div>
  );
};

export default ContentElements;
