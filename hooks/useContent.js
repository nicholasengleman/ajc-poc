import collectionApi from "content-sources/collection-api";
import collectionsContentApi from "content-sources/collections-content-api";

const getData = async ({ source, query }) => {
  switch (source) {
    case "collection-api":
      return collectionApi(query);
    case "collection-content":
      return collectionsContentApi(query);
    default:
      return null;
  }
};

export const useContent = async ({ source, query, transform }) => {
  const response = await getData({ source, query });

  if (response && transform) {
    return transform(response);
  }

  return response;
};
