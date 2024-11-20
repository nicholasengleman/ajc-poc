/**
 * @typedef {Object} AdConfigExport
 * @property {AdConfig[]} rightRail - Configuration for right rail ads.
 * @property {AdConfig[]} inContent - Configuration for in-content ads.
 * @property {AdConfig[]} inContentNext - Configuration for in-content ads that appear after the first set.
 */

export default {
  rightRail: [
    { staticSlot: 'RP01-Enhanced-List-Desktop', adSuffix: 1 },
    { staticSlot: 'RP10 sticky (desktop only)', adSuffix: 'dynamic' },
  ],
  inContent: [
    { staticSlot: 'MP02-Enhanced-List', adSuffix: 1 },
    { staticSlot: 'RP01-Enhanced-List-Tablet', adSuffix: 1 },
  ],
  inContentNext: [
    { staticSlot: 'MP10', adSuffix: 'dynamic' },
    { staticSlot: 'RP10', adSuffix: 'dynamic' },
  ],
};
