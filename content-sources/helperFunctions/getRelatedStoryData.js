import flatten from "lodash-es/flatten";
import handleError from "./handleError";

const getRelatedStoryData = (site = "ajc", contentData, getRelatedData) => {
  if (!getRelatedData) {
    return contentData;
  }

  const storyIdsForBulkCalls = [];
  const storyData = [];
  const promiseArray = [];
  const twoRelated = contentData.length === 2;

  if (contentData) {
    contentData.forEach((story) => {
      // eslint-disable-next-line camelcase
      const { related_content } = story;
      // eslint-disable-next-line camelcase
      const { basic: basicData } = related_content || {};
      const d =
        basicData &&
        basicData.map((e) => {
          const { _id: id } = e || {};
          return id || [];
        });
      storyIdsForBulkCalls.push(d);
    });
  }

  const newArray = [];

  storyIdsForBulkCalls.forEach(
    (contentElement) =>
      contentElement && contentElement.forEach((e1) => newArray.push(e1))
  );

  const storyIdsString = newArray.join(",");
  const bulkCallUrl = `https://api.ajc.arcpublishing.com/content/v4/ids?ids=${storyIdsString}&website=${site}&included_fields=headlines,description,canonical_url,related_content&published=true`;

  if (storyIdsString) {
    const promise = fetch(bulkCallUrl, {
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
        storyData.push(data);
      })
      .catch((error) => handleError(error));

    promiseArray.push(promise);
  }

  return Promise.allSettled(promiseArray).then(() => {
    const storyDataArray = [];

    /*
     * we were getting errors (actually just empty content) when looking for results values (they were always undefined)
     * so, instead, once promises are finished we loop through the storyData array that was pushed-to in the bulkcall above
     */
    storyData.forEach((sdata) => {
      if (sdata) {
        const { content_elements: dataContentElements } = sdata || {};
        storyDataArray.push(dataContentElements);
      } else {
        storyDataArray.push([]);
      }
    });

    const flattenStoryDataArray = flatten(storyDataArray);

    return contentData.map((story) => {
      const clonedStory = Object.assign({}, story);

      // eslint-disable-next-line camelcase
      const { related_content } = clonedStory || {};

      // eslint-disable-next-line camelcase
      const { basic: basicData } = related_content || {};
      let relatedContentData = [];

      if (basicData) {
        for (let i = 0; i < basicData.length; i += 1) {
          const index = flattenStoryDataArray.findIndex(
            (el) => el._id === basicData[i]._id
          );
          if (index !== -1) {
            const { headlines, canonical_url: canonicalUrl } =
              flattenStoryDataArray[index];
            relatedContentData.push({ headlines, canonicalUrl });
          }
        }
      }

      if (twoRelated && relatedContentData.length !== 0) {
        relatedContentData = relatedContentData.slice(0, 2);
      } else if (
        !twoRelated ||
        (twoRelated && relatedContentData.length === 0)
      ) {
        relatedContentData = relatedContentData.slice(0, 5);
      }

      return {
        ...clonedStory,
        relatedContentData,
      };
    });
  });
};

export default getRelatedStoryData;
