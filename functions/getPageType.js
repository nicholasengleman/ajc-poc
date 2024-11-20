import { useAppContext } from 'fusion:context';

const checkPageType = (type, layout, renderedOutput) => {
  const appContext = useAppContext();
  const { metaValue } = appContext;

  const page = {};

  const layoutOverride = metaValue('layout override');

  const finalLayout = layoutOverride || layout;

  if (type && type !== 'collection') {
    page.type = type;
    page.isHomeOrSectionPage = false;
  } else if (finalLayout) {
    const isSectionPage = finalLayout.indexOf('section') > -1;
    const pageTitleArray = [];
    const features =
      isSectionPage &&
      Array.isArray(renderedOutput) &&
      renderedOutput.map((element) => {
        if (element && element.collection === 'features' && element.type) {
          if (element.type === 'pageTitle/default') {
            pageTitleArray.push(element);
          }
          return element.type;
        }
        return null;
      });
    // checking if page has thirdPartyFeature
    const isThirdPartyFeature =
      isSectionPage &&
      Array.isArray(features) &&
      features.includes('ThirdPartyTease/default');
    const pageTitleElement =
      isSectionPage &&
      Array.isArray(features) &&
      features.includes('pageTitle/default') &&
      pageTitleArray.length
        ? pageTitleArray[0]
        : null;
    // Retrieving the pageTitle from pageTitleElement
    const { customFields: { pageTitle = '' } = {} } =
      pageTitleElement && pageTitleElement.props ? pageTitleElement.props : {};
    const isHome = finalLayout.indexOf('home') > -1;
    const isSection =
      isSectionPage ||
      finalLayout.indexOf('wrap') > -1 ||
      finalLayout.indexOf('ultimate') > -1;
    const isList = finalLayout.indexOf('list') > -1;
    const isStaff = finalLayout.includes('all-staff');
    const isWrap = finalLayout.indexOf('wrap') > -1;
    const isAuthor =
      finalLayout.includes('staff-bio-basic') ||
      (isSectionPage && features && features.includes('StaffBio/default'));
    const isError =
      isSectionPage && features && features.includes('404/default');
    const isLiveUpdate =
      isSectionPage && features && features.includes('ComposerEmbed/default');
    const isEnhancedList =
      isSectionPage && features && features.includes('ListEnhanced/default');
    const isWeather =
      isSectionPage &&
      isThirdPartyFeature &&
      pageTitle &&
      pageTitle.toLowerCase().includes('weather');
    const isTraffic =
      isSectionPage &&
      isThirdPartyFeature &&
      pageTitle &&
      pageTitle.toLowerCase().includes('traffic');
    const isPodcast = finalLayout === 'podcast';
    page.type = finalLayout.substring(0, finalLayout.indexOf('-'));
    page.isStaff = isStaff;
    page.isWeather = isWeather;
    page.isTraffic = isTraffic;
    page.isEnhancedList = isEnhancedList;
    page.isError = isError;
    page.isLiveUpdate = isLiveUpdate;
    page.isHome = isHome;
    page.isSection = isSection;
    page.isList = isList;
    page.isAuthor = isAuthor;
    page.isWrap = isWrap;
    page.isNonContentPage = finalLayout !== 'section-special-presentation';
    page.isHomeOrSectionPage = isHome || isSection;
    page.isPodcast = isPodcast;
  }
  return page;
};

export default checkPageType;
