import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import { useContent } from 'fusion:content';
import getDomain from './getDomain';
import setFocalCoords from '../../../content/sources/helper_functions/setFocalCoords';
import getContentMeta from '../../_helper_components/global/siteMeta/_helper_functions/getContentMeta';

const renderImage = () => {
  const appContext = useAppContext();
  const {
    arcSite,
    globalContent,
    deployment,
    contextPath,
    metaValue,
    layout,
    globalContentConfig,
  } = appContext;

  const { pageContentType = '' } = getContentMeta() || {};

  const isLiveUpdatesPage =
    globalContentConfig?.source === 'live-updates' ||
    globalContentConfig?.query?.includeSubtypes === 'liveupdates';
  const globalContentData =
    isLiveUpdatesPage && Array.isArray(globalContent)
      ? globalContent[0]
      : globalContent;

  const { logoOgImage, cdnSite, cdnOrg } = getProperties(arcSite);
  const {
    promo_items: promoItems,
    content_elements: contentElements,
    image: staffImage = '',
  } = globalContentData || {};

  const {
    url: featuredImage,
    promo_image: promoImage,
    additional_properties: additionalProperties,
    focal_point: rootFocalPoint,
    height: originalHeight,
    width: originalWidth,
  } = promoItems && promoItems.basic ? promoItems.basic : {};
  const focalCoords = setFocalCoords(additionalProperties, rootFocalPoint);

  const { url: videoThumbnail } = promoImage || {};
  const { promo_items: galleryPromoItems } =
    promoItems && promoItems.basic ? promoItems.basic : {};
  const { url: galleryThumbnail } =
    galleryPromoItems && galleryPromoItems.basic ? galleryPromoItems.basic : {};
  let ogContentImage = null;

  if (featuredImage) {
    ogContentImage = featuredImage;
  } else if (staffImage) {
    ogContentImage = staffImage;
  } else if (videoThumbnail) {
    ogContentImage = videoThumbnail;
  } else if (galleryThumbnail) {
    ogContentImage = galleryThumbnail;
  } else if (contentElements) {
    let foundFirstInline = false;
    contentElements.forEach((el) => {
      if (!foundFirstInline) {
        const { type, url = null, promo_items: inlinePromoItems = {} } = el;
        if (type === 'image') {
          ogContentImage = url;
          foundFirstInline = true;
        }
        if (
          type === 'video' &&
          inlinePromoItems.basic &&
          inlinePromoItems.basic.url
        ) {
          ogContentImage = inlinePromoItems.basic.url;
          foundFirstInline = true;
        }
      }
    });
  }
  if (metaValue('image') || metaValue('thumbnail') || metaValue('og:image')) {
    ogContentImage =
      metaValue('image') || metaValue('thumbnail') || metaValue('og:image');
    return ogContentImage;
  }
  if (ogContentImage) {
    const height = pageContentType === 'author' ? 200 : 315;
    const width = pageContentType === 'author' ? 300 : 600;
    const imgQuery = {
      src: ogContentImage,
      imageSize: [[width, height]],
      originalHeight,
      originalWidth,
      focalCoords,
      arcSite,
    };
    const image = useContent({
      source: 'resizer',
      query: imgQuery,
      transform(data) {
        if (!data) return null;
        const entries = Object?.entries(data);
        const [, value] = entries[0];
        return { src: value?.value?.src };
      },
    });
    if (!ogContentImage) return null;

    return image?.src || '';
  }
  return `${getDomain(layout, cdnSite, arcSite, cdnOrg)}${deployment(`${contextPath}${logoOgImage}`)}`;
};

export default renderImage;
