import React from 'react';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import PropTypes from 'prop-types';
import Image from '../../../../global/image/default.jsx';
import getItemThumbnail from '../../../../../features/Slider/_helper_functions/getItemThumbnail.js';
import './default.scss';

const InterstitialLink = ({ src, shortcode, contentId }) => {
  const { content, url } = src;
  if (!src) return null;
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const data =
    contentId && shortcode
      ? useContent({
          source: 'related-content-api',
          query: {
            storyIds: contentId,
            arcSite,
          },
        })
      : null;

  const { content_elements: contentElements = [] } = data || {};
  const {
    canonical_url: canonicalUrl,
    headlines,
    promo_items: promoItems = {},
    teaseImageObject,
  } = contentElements[0] || {};
  const thumbnail = getItemThumbnail(teaseImageObject || promoItems);

  if (!thumbnail || !shortcode) {
    return (
      <section className='c-interstitialLink b-margin-bottom-d40-m20'>
        <span className='prefix'>Explore</span>
        <a className='headline' href={url || canonicalUrl} target='_self'>
          {content || headlines?.basic}
        </a>
      </section>
    );
  }

  return (
    <section className='c-interstitialLink'>
      <a className='shortcode' href={canonicalUrl} target='_self'>
        <div className='b-flexColumn b-flexRow'>
          <span className='prefix'>EXPLORE</span>
          <span className='headline'>{headlines?.basic} </span>
        </div>
        {thumbnail && (
          <Image
            src={thumbnail}
            imageType='isInlineImage'
            primarySize={[[135, 135]]}
          />
        )}
      </a>
    </section>
  );
};

InterstitialLink.propTypes = {
  src: PropTypes.object,
  shortcode: PropTypes.bool,
  contentId: PropTypes.string,
};

export default InterstitialLink;