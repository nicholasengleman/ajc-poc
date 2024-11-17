const processData = (data = []) =>
  data.map((item) => {
    if (
      item.type === "story" &&
      !item.promo_items?.basic?.url &&
      item.content_elements
    ) {
      const firstInlineImage = item.content_elements.find(
        (element) => element.type === "image"
      );

      if (firstInlineImage) {
        return { ...item, firstInlineImage };
      }
    }
    return item;
  });

export default processData;
