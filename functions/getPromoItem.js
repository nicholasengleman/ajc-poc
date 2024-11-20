export default function getPromoItem({
  teaseImageObject,
  firstInlineImage,
  promoItems,
  contentType,
}) {
  if (teaseImageObject?.resized_obj || teaseImageObject?.url) {
    return teaseImageObject;
  }
  if (promoItems) {
    if (contentType === 'video' || contentType === 'gallery') {
      if (promoItems.basic) {
        return promoItems.basic;
      }
    }
    if (promoItems?.basic?.type === 'image') {
      return promoItems.basic || promoItems.lead_art.promo_items.basic;
    }
    if (
      promoItems?.basic?.type === 'video' ||
      promoItems?.basic?.type === 'gallery'
    ) {
      if (promoItems.basic.promo_items && promoItems.basic.promo_items.basic) {
        return promoItems.basic.promo_items.basic;
      }
    }
  }
  if (firstInlineImage) {
    return firstInlineImage;
  }
  return null;
}
