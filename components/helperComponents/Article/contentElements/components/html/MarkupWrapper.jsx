/* eslint-disable prefer-destructuring */
import React, { PureComponent, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Parser } from 'htmlparser2';
import get from 'lodash-es/get';
import ArcAd from '../../../../../features/ads/default';
import StoryCards from '../storyCards/default';
import ComposerEmbed from '../../../../../features/ComposerEmbed/default';
import InterstitialLink from '../interstitial_link/default';

const LazyExpandableTextMessage = lazy(
  () => import('./components/ExpandableTextMessage/default'),
);
const LazyScriptWrapper = lazy(() => import('./components/Script/default'));
const LazyPymLoader = lazy(() => import('./components/PymLoader/default'));
const LazyViewRecipe = lazy(() => import('./components/Recipe/default'));
const LazyDefendantsTable = lazy(
  () => import('../defendants/defendantsTable/default'),
);
const LazyDefendantsCard = lazy(
  () => import('../defendants/defendantsCard/default'),
);
const LazyTimeline = lazy(
  () => import('../../../../../features/Timeline/default'),
);
const LazySlider = lazy(() => import('../../../../../features/Slider/default'));

class MarkupWrapper extends PureComponent {
  constructor(props) {
    super(props);

    const plugins = [
      'script',
      'ExpandableTextMessage',
      'PymLoader',
      'CustomInfoBox',
      'DataWrapper',
      'DocumentCloud',
      'Ad',
      'ViewRecipe',
      'PodcastPromo',
      'InterstitialLink',
      'Slider',
      'Timeline',
      'DefendantsTable',
      'DefendantsCard',
      'StoryCards',
    ];

    let component;
    let shortcodeId;
    let defendantChargeDataId;
    let defendantAspectDataId;
    let colorScheme;
    let listTitle;

    const parser = new Parser({
      onopentag: (tag, attributes) => {
        const {
          class: className,
          id,
          'data-chargedataid': chargeDataId,
          'data-aspectdataid': aspectDataId,
          'data-colorscheme': colorSchemeId,
          'data-list-title': listTitleId,
        } = attributes || {};

        const isRecipe = className === 'recipe_container';
        // Priotize classname over plugins since there's a script that exists in the recipe that would be identified as a script rather than a recipe
        const findComponent = isRecipe
          ? className
          : plugins.find((item) => item.toLowerCase() === tag.toLowerCase());
        if (!findComponent) return;
        component = findComponent;
        if (id) shortcodeId = id;
        if (chargeDataId) defendantChargeDataId = chargeDataId;
        if (aspectDataId) defendantAspectDataId = aspectDataId;
        if (colorSchemeId) colorScheme = colorSchemeId;
        if (listTitleId) listTitle = listTitleId;
      },
    });

    parser.write(this.props.html);
    parser.end();
    if (component) this.component = component;
    if (shortcodeId) this.shortcodeId = shortcodeId;
    if (defendantChargeDataId)
      this.defendantChargeDataId = defendantChargeDataId;
    if (defendantAspectDataId)
      this.defendantAspectDataId = defendantAspectDataId;
    if (colorScheme) this.colorSchemeId = colorScheme;
    if (listTitle) this.listTitleId = listTitle;
  }

  render() {
    const component = get(this, 'component');
    if (!component)
      return <div dangerouslySetInnerHTML={{ __html: this.props.html }} />;
    const embedHtml = this.props.html;
    // creating vars for ad case
    const adAttributes = { slot: '', suffix: '' };
    let slotName = '';
    switch (component.toLowerCase()) {
      case 'expandabletextmessage':
        return (
          <Suspense>
            <LazyExpandableTextMessage html={embedHtml} />
          </Suspense>
        );
      case 'script':
        return (
          <Suspense>
            <LazyScriptWrapper html={embedHtml} />
          </Suspense>
        );
      case 'pymloader':
        return (
          <Suspense>
            <LazyPymLoader html={embedHtml} />
          </Suspense>
        );
      case 'custominfobox':
      case 'datawrapper':
      case 'documentcloud':
      case 'podcastpromo':
        // if the story references a custom shortcode embed (via the typical pattern) then we pass it to the composer embed component
        return <ComposerEmbed {...{ composerHtml: embedHtml }} />;
      case 'ad':
        embedHtml
          .replace(/[\\"\\'<>\\/]/gi, '')
          .split(' ')
          .forEach((part) => {
            if (part.indexOf('=') > -1) {
              const adKVs = part.trim().split('=');
              switch (adKVs[0].toLowerCase()) {
                case 'slot':
                  adAttributes.slot = adKVs[1];
                  break;
                case 'suffix':
                  adAttributes.suffix = adKVs[1];
                  break;
                default:
                  adAttributes[adKVs[0]] = adKVs[1];
              }
            }
          });
        slotName = adAttributes.slot;
        if (slotName.indexOf('-') === -1) {
          // only uppercase slots that are not hyphenated, as casing matters for hyphenated slots (but is not easily done programmatically so must be entered that way in composer)
          slotName = slotName.toUpperCase();
        }

        return <ArcAd staticSlot={slotName} adSuffix={adAttributes.suffix} />;
      case 'viewrecipe':
        return (
          <Suspense>
            <LazyViewRecipe />
          </Suspense>
        );
      case 'recipe_container':
        return null;
      case 'interstitiallink':
        return (
          <InterstitialLink
            src={embedHtml}
            shortcode={true}
            contentId={this.shortcodeId}
          />
        );
      case 'slider':
        return (
          <Suspense>
            <LazySlider
              customFields={{
                content: {
                  contentService: 'content-preview-api',
                  contentConfigValues: {
                    id: this.shortcodeId,
                    size: 99,
                  },
                },
                isComposerSlider: true,
              }}
            />
          </Suspense>
        );
      case 'timeline':
        return (
          <Suspense>
            <LazyTimeline
              customFields={{
                composerId: this.shortcodeId,
                layout: 'vertical',
              }}
            />
          </Suspense>
        );
      case 'defendantstable':
        return (
          <Suspense>
            <LazyDefendantsTable
              chargeDataId={this.defendantChargeDataId}
              aspectDataId={this.defendantAspectDataId}
            />
          </Suspense>
        );
      case 'defendantscard':
        return (
          <Suspense>
            <LazyDefendantsCard
              contentId={this.shortcodeId}
              listTitle={this.listTitleId}
            />
          </Suspense>
        );
      case 'storycards':
        return (
          <StoryCards
            contentId={this.shortcodeId}
            includeAds={this.props.includeAds || this.includeAds}
            colorScheme={this.props.colorScheme || this.colorSchemeId}
          />
        );
      default:
        return <></>;
    }
  }
}

MarkupWrapper.propTypes = {
  html: PropTypes.string,
  src: PropTypes.string,
  render: PropTypes.func,
  includeAds: PropTypes.bool,
  colorScheme: PropTypes.string,
};

export default MarkupWrapper;
