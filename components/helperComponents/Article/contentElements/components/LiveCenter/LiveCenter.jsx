import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { LIVECENTER_TENANT_KEY } from 'fusion:environment';

/**
 * Handles the composer-driven sidebar component together with the power-up for sidebars
 * @param {*} embed - power-up stored data (custom_embed)
 * @returns
 */
const LiveCenter = ({ embed }) => {
  const { config: data } = embed || {};

  useEffect(() => {
    // Function to dynamically load scripts
    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(script);
        script.onerror = () =>
          reject(new Error(`Script load error for ${src}`));
        document.body.appendChild(script);
      });

    // Function to dynamically load CSS
    const loadCss = (href) => {
      const link = document.createElement('link');
      link.href = href;
      link.type = 'text/css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    };

    // Load CSS files
    loadCss(
      'https://livecenter.norkon.net/scripts/ncposts/ncposts-6.1.1.min.css',
    );
    loadCss(
      `https://livecentercdn.norkon.net/LiveCenter/ExtensionCss/${LIVECENTER_TENANT_KEY}`,
    );

    // Load scripts and initialize NcPosts
    const initLiveFeed = async () => {
      if (!window.NcPosts) {
        await loadScript(
          'https://livecenter.norkon.net/scripts/ncposts/ncposts-6.1.1.min.js',
        );
        await loadScript(
          `https://livecentercdn.norkon.net/LiveCenter/ExtensionJs/${LIVECENTER_TENANT_KEY}`,
        );
      }

      // Assuming NcPosts is now loaded, initialize it
      if (window.NcPosts) {
        window.NcPosts.start({
          channelId: data.channelId,
          tenantKey: LIVECENTER_TENANT_KEY,
          container: document.getElementById('master-container'),
          showMoreElement: document.getElementById('lc-load-more'),
          extensionContainer: window.NcLiveCenterExtensions,
        });
      }
    };

    initLiveFeed().catch((error) =>
      console.error('Failed to initialize live feed:', error),
    );

    // Cleanup function to remove scripts if component unmounts
    return () => {
      const scripts = document.querySelectorAll('script[src*="livecenter"]');
      scripts.forEach((script) => script.remove());
      const links = document.querySelectorAll('link[href*="livecenter"]');
      links.forEach((link) => link.remove());
    };
  }, []);

  return (
    <div className='lc-feed-container'>
      <div id='master-container'></div>
      <div style={{ textAlign: 'center' }}>
        <button className='lc-load-more' id='lc-load-more'>
          Load more
        </button>
      </div>
    </div>
  );
};

LiveCenter.propTypes = {
  embed: PropTypes.object,
};

export default LiveCenter;
