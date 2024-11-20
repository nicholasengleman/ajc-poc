const getTopics = (promoItems = {}, taxonomy = {}) => {
  const { basic = {} } = promoItems || {};
  let keywordsArr = [];
  // Lead image should not be included in topics
  if (basic?.type !== 'image') {
    const { additional_properties: additionalProperties = {} } = basic;
    const { keywords = [] } = additionalProperties;
    keywordsArr = keywords;
  }

  const { tags = [] } = taxonomy;

  const finalTaxonomyTags = [];
  if (tags.length) {
    tags.forEach((tag) =>
      tag?.name
        ? finalTaxonomyTags.push(tag.name.replace(/"/g, ''))
        : tag?.text && finalTaxonomyTags.push(tag.text.replace(/"/g, '')),
    );
  }

  return [...new Set([...finalTaxonomyTags, ...keywordsArr])];
};

export default getTopics;
