import React from 'react';
import ArcAd from '../../../../features/ads/default';

/**
 * @typedef {Object} AdConfig
 * @property {string} staticSlot - The static slot name for the ad.
 * @property {(number|string)} adSuffix - The suffix for the ad. Can be a number or the string 'dynamic'.
 */

/**
 * AdContainer component renders a list of ArcAd components based on the provided configuration.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {AdConfig[]} props.adConfig - An array of ad configurations.
 * @param {number} props.sectionIndex - The index of the section where the ads are being rendered.
 * @returns {React.ReactElement} A React fragment containing ArcAd components.
 *
 * @example
 * const adConfig = [
 *   { staticSlot: 'RP01-List-Page', adSuffix: 1 },
 *   { staticSlot: 'RP09 sticky listPage', adSuffix: 'dynamic' },
 * ];
 *
 * <AdContainer adConfig={adConfig} sectionIndex={0} />
 */

const AdContainer = ({ adConfig, sectionIndex }) =>
  adConfig.map((ad, index) => (
    <ArcAd
      key={`${ad.staticSlot}-${sectionIndex}-${index}`}
      staticSlot={ad.staticSlot}
      adSuffix={ad.adSuffix === 'dynamic' ? sectionIndex + 1 : ad.adSuffix}
      customId={`div-id-${ad.staticSlot}_${sectionIndex + 1}`}
    />
  ));

export default AdContainer;
