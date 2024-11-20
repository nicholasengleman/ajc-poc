// import React, { Fragment, useEffect } from "react";
// import PropTypes from "prop-types";
// import { useContent } from "fusion:content";
// import { useFusionContext } from "fusion:context";
// import Markdown from "markdown-to-jsx";
// import convertCsvToJson from "../../../../global/utils/convertCsvToJson";
// import Section from "../../../Section";
// import Image from "../../../../global/image/default";
// import filterContentElements from "../../../../../layouts/_helper_functions/article/filterContentElements";
// import SpotifyIcon from "../../../../../../resources/icons/storyCards/Spotify";
// import YoutubeIcon from "../../../../../../resources/icons/storyCards/Youtube";
// import ArcAd from "../../../../../features/ads/default";
// import "./default.scss";

// const StoryCards = ({ contentId, includeAds, colorScheme }) => {
//   const fusionContext = useFusionContext();
//   const { arcSite } = fusionContext;
//   let toggledAdSlot = "HP04";
//   let adCount = 0;
//   const data = contentId
//     ? useContent({
//         source: "content-preview-api",
//         query: {
//           id: contentId,
//           arcSite,
//           published: false,
//         },
//         transform(csvData) {
//           if (!csvData) return null;
//           if (csvData.subtype === "colorcard") {
//             return csvData;
//           }

//           // not composer, treat as csv
//           return convertCsvToJson(csvData.content_elements[0].content.trim());
//         },
//       })
//     : null;

//   useEffect(() => {
//     let lastClickedAudio = null;

//     const setupAudioListeners = () => {
//       const audioPlayers = document.querySelectorAll("audio");

//       audioPlayers.forEach((player) => {
//         if (!player.paused) {
//           lastClickedAudio = player;
//         }
//         player.addEventListener("play", () => {
//           if (lastClickedAudio && lastClickedAudio !== player) {
//             lastClickedAudio.pause();
//           }
//           lastClickedAudio = player;
//         });
//       });
//     };

//     if (data && !data.subtype) {
//       setupAudioListeners();
//     }

//     return () => {
//       if (data && !data.subtype) {
//         const audioPlayers = document.querySelectorAll("audio");
//         audioPlayers.forEach((player) => {
//           player.removeEventListener("play", () => {});
//         });
//       }
//     };
//   }, [data]);

//   const getButton = (link) => {
//     if (!link) return null;

//     if (link?.includes("spotify")) {
//       return (
//         <a href={link} className="btn" target="_blank" rel="noreferrer">
//           <SpotifyIcon />
//           Listen on Spotify
//         </a>
//       );
//     }

//     if (link?.includes("youtu.be")) {
//       return (
//         <a href={link} className="btn" target="_blank" rel="noreferrer">
//           <YoutubeIcon />
//           Listen on Youtube
//         </a>
//       );
//     }

//     if (link?.includes("amazonaws.com") || link?.includes("cloudfront")) {
//       return (
//         <div className="audio-player">
//           <audio
//             controls
//             src={link}
//             controlsList="nodownload"
//             type="audio/mpeg"
//           ></audio>
//         </div>
//       );
//     }

//     if (link?.startsWith("http://") || link?.startsWith("https://")) {
//       return (
//         <a href={link} target="_blank" rel="noreferrer">
//           {link.replace(/^https?:\/\//, "")}
//         </a>
//       );
//     }

//     return null;
//   };

//   const getAd = (index) => {
//     if (includeAds && index > 0 && index % 4 === 0) {
//       toggledAdSlot = toggledAdSlot === "HP03" ? "HP04" : "HP03";
//       adCount += 1;

//       return (
//         <ArcAd
//           staticSlot={toggledAdSlot}
//           adSuffix={adCount}
//           key={`${toggledAdSlot}-${adCount}`}
//           lazyLoad={false}
//         />
//       );
//     }
//     return null;
//   };

//   const renderCard = (card, index) => {
//     const {
//       headlines,
//       content_elements: contentElements,
//       promo_items: promoItems = {},
//       title: csvHeadline,
//       thumbnail_url: csvThumbnailUrl,
//       link: csvLink,
//       subtype,
//       description,
//     } = card || {};
//     const isJsonData = subtype !== "colorcard";
//     const title = isJsonData ? csvHeadline : headlines?.basic;
//     const promoData = promoItems ? promoItems.basic : null;
//     if (promoData) {
//       // clear out caption & credits
//       delete promoData.caption;
//       delete promoData.credits;
//     }
//     let cardDescription = "";
//     if (!isJsonData) {
//       const filteredContentElements = contentElements.length
//         ? filterContentElements({ contentElements })
//         : contentElements;
//       cardDescription = (
//         <div className="description">
//           <Section
//             elements={filteredContentElements}
//             startIndex={0}
//             stopIndex={filteredContentElements.length}
//             isSingleColumnArticle={true}
//           />
//         </div>
//       );
//     } else {
//       cardDescription = (
//         <div className="description">
//           <Markdown>{description}</Markdown>
//         </div>
//       );
//     }

//     return (
//       <Fragment key={index}>
//         {isJsonData && getAd(index)}
//         <div className="story-card">
//           <div className="color-overlay"></div>
//           <div className="content">
//             <div className="image">
//               {(promoData || csvThumbnailUrl) && (
//                 <Image
//                   primarySize={[[350, 350]]}
//                   imageType="isLeadImage"
//                   src={
//                     promoData || {
//                       url: csvThumbnailUrl,
//                       alt_text: `Image for ${title}`,
//                     }
//                   }
//                 />
//               )}
//             </div>
//             <div className="info">
//               <p className="title">{title}</p>
//               {cardDescription}
//               {csvLink && getButton(csvLink)}
//             </div>
//           </div>
//         </div>
//       </Fragment>
//     );
//   };

//   if (data) {
//     return (
//       <div
//         className={`c-story-cards ${
//           colorScheme ? `colorscheme-${colorScheme}` : ""
//         }`}
//         data-subtype={data.subtype || "shortcode"}
//         data-size={data.length || 1}
//       >
//         {!data.subtype && data.map((card, index) => renderCard(card, index))}
//         {data.subtype && data.subtype === "colorcard" && renderCard(data, 0)}
//       </div>
//     );
//   }

//   return null;
// };

// StoryCards.propTypes = {
//   contentId: PropTypes.string,
//   includeAds: PropTypes.bool,
//   colorScheme: PropTypes.string,
// };

// export default StoryCards;
