/* eslint-disable no-console */
import handleError from "./handleError";

const getCollectionData = async (
  arcSite,
  id,
  size = 20,
  from = 0,
  onlyIncludeThisType,
  published = true
) => {
  if (!arcSite || !id) {
    return null;
  }

  const sizeInt = parseInt(size, 10);

  const promiseArray = [];
  const contentElements = [];

  const buffer = 3;
  const fetchSize = 20;
  const numberOfFetches =
    sizeInt + buffer <= fetchSize
      ? 1
      : Math.ceil((sizeInt + buffer) / fetchSize);

  let fetchStart = from - 1;
  let i = 1;

  while (i <= numberOfFetches && i < 10) {
    let requestUri = `https://api.ajc.arcpublishing.com/content/v4/collections/?website=${arcSite}`;
    requestUri += `&_id=${id}`;
    requestUri += `&from=${fetchStart}`;
    requestUri += `&size=${fetchSize}`;
    requestUri += `&published=${published}`;

    const promise = fetch(requestUri, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.ARC_ACCESS_TOKEN}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Fetch failed with status ${response.status}`);
        }
        const data = await response.json();
        const filteredData = data?.content_elements?.filter((el) => {
          if (onlyIncludeThisType) {
            return el.type === onlyIncludeThisType && el.publish_date;
          }
          return el.publish_date;
        });

        // if published===true, we pass the filtered data, otherwise we pass the original data
        if (published) {
          contentElements.push({ id: i, data: filteredData });
        } else {
          contentElements.push({
            id: i,
            data: data?.content_elements,
          });
        }
      })
      .catch((error) => handleError(error));

    promiseArray.push(promise);

    fetchStart += fetchSize;
    i += 1;
  }

  await Promise.all(promiseArray);

  let sortedContentElements = [];
  contentElements
    .sort((a, b) => a.id - b.id)
    .forEach((content) => {
      sortedContentElements = [...sortedContentElements, ...content.data];
    });

  return sortedContentElements;
};

export default getCollectionData;
