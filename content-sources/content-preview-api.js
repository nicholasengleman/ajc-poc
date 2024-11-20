import contentAPIFilter from "../filters/content-api-filter";
import FetchResizedImages from "./helper_functions/FetchResizedImages";

const strict = false;
const schemaName = "article";
// const ttl = 259200;
const ttl = 900;

const params = {
  path: "text",
  published: "text",
  id: "text",
};

const resolve = (query) => {
  const { "arc-site": arcSite = "ajc", path, id } = query;
  let requestUri = `/content/v4/?published=false&website=${arcSite}&included_fields=${contentAPIFilter}`;
  requestUri += path ? `&website_url=${path}` : "";
  requestUri += id ? `&_id=${id}` : "";
  if (!path && !id) {
    const error = new Error();
    error.statusCode = 400;
    throw error;
  }
  return requestUri;
};

const transform = (data, query) => {
  const { "arc-site": arcSite = "ajc" } = query;
  // Only lead and inline gallery images get resized here on story pages
  return FetchResizedImages({
    arcSite,
    data,
    primarySize: [
      [1000, 0],
      [1000, 0],
      [800, 0],
    ],
    contentSrc: "content-api",
  });
};

export default {
  ttl,
  resolve,
  params,
  schemaName,
  transform,
  strict,
};
