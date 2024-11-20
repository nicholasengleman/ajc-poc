import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import MarkupWrapper from './MarkupWrapper';
import './default.scss';

const HTML = ({ src, index }) => {
  const { content, alignment } = src || '';
  let sanitizedContent = content;
  if (
    content.indexOf(/<script(?![^>]*\/>)[^>]*>[^<].*/g) > -1 &&
    content.indexOf('</script>') === -1
  ) {
    // there's an opening script tag with no closing tag, so add one
    sanitizedContent = `${content}</script>`;
  }

  useEffect(() => {
    const checkForAudioElements = () => {
      const audioElements = document.querySelectorAll('.c-customHTML audio');
      if (audioElements.length > 0) {
        window.dataLayer.push({ event: 'audioElementsDetected' });
      }
    };

    checkForAudioElements();
  }, [sanitizedContent]);

  const htmlOutput = (
    <div
      className={`b-margin-bottom-d40-m20 c-customHTML ${alignment ? `align-${alignment}` : ''}`}
      data-index={index || null}
    >
      <MarkupWrapper html={sanitizedContent} />
    </div>
  );
  const isLazyLoadExempt =
    sanitizedContent.includes('tradingview-widget-container') ||
    sanitizedContent.includes('ai2html');
  if (isLazyLoadExempt) {
    return htmlOutput;
  }
  return <LazyLoad>{htmlOutput}</LazyLoad>;
};

HTML.propTypes = {
  src: PropTypes.object,
  index: PropTypes.number,
};

export default HTML;
