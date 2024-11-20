"use client";

import React, { useState, useEffect, useRef } from "react";
// TOTO: check if this is still needed
// import '../../../../../../src/styles/base/_utility.scss';
import "./default.scss";

const Oembed = ({ src, index }) => {
  const { raw_oembed: rawOembed, alignment } = src || {};
  const { type, html } = rawOembed || {};
  let filteredHtml = html;
  let SCRIPT_URL = null;
  const scriptFilter = /<script[\s\S]*?>[\s\S]*?<\/script>/gi;

  const containerRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const lazyOembedRef = useRef(null);

  const processInstagramEmbeds = () => {
    if (window.instgrm && window.instgrm.Embeds) {
      window.instgrm.Embeds.process();
    }
  };

  // changed the following from a useEffect to function called in useEffect below that lazy loads component when in view port
  const loadScript = () => {
    if (type === "reddit") {
      SCRIPT_URL = "https://embed.redditmedia.com/widgets/platform.js";
    } else if (type === "facebook-post" || type === "facebook-video") {
      SCRIPT_URL =
        "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v5.0";
    } else if (type === "twitter") {
      SCRIPT_URL = "https://platform.twitter.com/widgets.js";
    } else if (type === "instagram") {
      SCRIPT_URL = "//www.instagram.com/embed.js";
    }
    if (SCRIPT_URL) {
      // eslint-disable-next-line global-require
      require("scriptjs")(SCRIPT_URL, `${SCRIPT_URL}`, () => {
        setScriptLoaded(true);
      });
    }
  };

  // Adds lazy loading of component till its is in the viewport
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadScript();
          observer.unobserve(entry.target);
        }
      });
    });

    if (lazyOembedRef.current) {
      observer.observe(lazyOembedRef.current);
    }

    return () => {
      if (lazyOembedRef.current) {
        observer.unobserve(lazyOembedRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (type === "instagram" && scriptLoaded) {
      const handleMutation = () => {
        const blockquoteElement = containerRef.current.querySelector(
          "blockquote.instagram-media"
        );
        if (blockquoteElement) {
          processInstagramEmbeds();
        }
      };

      const observer = new MutationObserver(handleMutation);
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
      });

      return () => {
        observer.disconnect();
      };
    }
    return undefined;
  }, [type, scriptLoaded]);

  if (
    type === "reddit" ||
    type === "facebook-post" ||
    type === "facebook-video" ||
    type === "twitter" ||
    type === "instagram"
  ) {
    filteredHtml = html ? html.replace(scriptFilter, "") : "";
  }

  return (
    // allows both observers to function
    <div className="embed-container">
      <div
        ref={(el) => {
          containerRef.current = el;
          lazyOembedRef.current = el;
        }}
        data-oembed-type={type}
        className={`b-flexRow b-flexCenter b-margin-bottom-d40-m20 ${
          alignment ? `align-${alignment}` : ""
        }`}
        dangerouslySetInnerHTML={{ __html: filteredHtml }}
        data-index={index || null}
      />
    </div>
  );
};

export default Oembed;
