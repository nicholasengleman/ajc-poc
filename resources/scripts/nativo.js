const triggerNativoEvent = new Event('triggerNativo');

document.addEventListener('triggerNativo', () => {
  const nativoScript = document.createElement('script');
  const meterMeta = document.querySelector('meta[name=\'story.meter\']');
  const isProd = (document.location.host.indexOf('dev') === -1 && document.location.host.indexOf('sandbox') === -1);
  const {
    arcSite,
    globalContentConfig,
    layout,
    getProperties = () => {},
  } = window.Fusion;
  const siteProps = getProperties(arcSite) || {};
  const { connext: connextProps = {}, piano: pianoProps = {} } = siteProps || {};
  const connextEnvProps = isProd ? connextProps.prod : connextProps.sandbox;
  const pianoEnvProps = isProd ? pianoProps.prod : pianoProps.sandbox;
  const pianoIsEnabled = pianoEnvProps ? pianoEnvProps.isEnabled : false;
  const allowMeter = connextEnvProps ? connextEnvProps.allowMeter : false;
  let nativoIsDeferred = false;
  nativoScript.src = 'https://s.ntv.io/serve/load.js';
  nativoScript.id = 'nativoScript';
  const isLiveUpdatesPage = globalContentConfig?.query?.includeSubtypes === 'liveupdates';
  const isStory = layout === 'article-basic' || layout === 'article-in-depth' || (window.initialDataObj && window.initialDataObj.pageData && window.initialDataObj.pageData.pageContentType === 'article');
  const hasRevenueFeature = document.querySelector('.c-revenue');

  if (hasRevenueFeature) {
    // if the page has a revenue feature, we want to manually trigger nativo, so don't auto-start
    nativoScript.setAttribute('data-ntv-set-no-auto-start', true);
  }
  if ((isStory || isLiveUpdatesPage) && arcSite !== 'dayton') {
    // it's a story page (thus `meterMeta` exists) and NOT Dayton (because Dayton doesn't yet have Taboola)
    nativoScript.setAttribute('data-ntv-set-no-auto-start', true);
    if ((meterMeta.getAttribute('content') === 'premium' || meterMeta.getAttribute('content') === 'subscriberonly') && allowMeter && !pianoIsEnabled) {
      // we add the nativo script to the deferred list for premium stories so that it isn't loaded until we know the paywall/auth state
      window.deferUntilKnownAuthState = window.deferUntilKnownAuthState || [];
      window.deferUntilKnownAuthState.push({ script: nativoScript });
      nativoIsDeferred = true;
    }
  }
  if (!nativoIsDeferred) document.querySelector('head').appendChild(nativoScript);
});

switch (document.readyState) {
  case 'complete':
  case 'loaded':
  case 'interactive':
    document.dispatchEvent(triggerNativoEvent);
    break;
  default:
    window.addEventListener('DOMContentLoaded', () => {
      document.dispatchEvent(triggerNativoEvent);
    });
}
