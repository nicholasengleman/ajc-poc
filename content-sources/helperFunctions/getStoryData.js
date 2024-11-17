/* eslint-disable no-console */
import flatten from "lodash-es/flatten";
import handleError from "./handleError";

const getStoryData = (site = "ajc", contentElements, published = true) => {
  if (Array.isArray(contentElements)) {
    const storyIdsForBulkCalls = [];
    const storyData = [];
    const promiseArray = [];

    for (let i = 0; i < contentElements.length; i += 50) {
      // Create bulk calls in chunks of 50
      const startIndex = i;
      const stopIndex = startIndex + 50;

      storyIdsForBulkCalls.push(
        contentElements.slice(startIndex, stopIndex).map((story) => {
          const { _id: id } = story || {};
          return id || "";
        })
      );
    }

    // Create promises for each bulk API call
    storyIdsForBulkCalls.forEach((storyIdArray) => {
      const storyIdsString = storyIdArray.join(",");
      const bulkCallUrl = `https://api.ajc.arcpublishing.com/content/v4/ids?ids=${storyIdsString}&website=${site}&published=${published}&included_fields=content_elements,first_publish_date,streams,related_content,duration`;

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
    });

    // Process the resolved promises and map results back to original stories
    return Promise.all(promiseArray)
      .then(() => {
        const storyDataArray = [];
        storyData.forEach((sdata) => {
          const {
            content_elements: dataContentElements,
            streams,
            related_content: relatedContent,
            duration,
          } = sdata || {};
          storyDataArray.push(
            dataContentElements,
            streams,
            relatedContent,
            duration
          );
        });

        const flattenStoryDataArray = flatten(storyDataArray);

        return contentElements.map((story) => {
          const clonedStory = { ...story };
          const { _id: clonedStoryId } = clonedStory;

          const contentElementsFromBulkCall = flattenStoryDataArray.filter(
            (flattenStory) => flattenStory && flattenStory._id === clonedStoryId
          );
          const {
            content_elements: contentElementsFromBulkCallForStory,
            first_publish_date: firstPublishDate,
            streams,
            related_content: relatedContent,
            duration,
          } = contentElementsFromBulkCall && contentElementsFromBulkCall[0];

          return {
            ...clonedStory,
            content_elements: contentElementsFromBulkCallForStory,
            first_publish_date: firstPublishDate,
            streams,
            related_content: relatedContent,
            duration,
          };
        });
      })
      .catch((error) => handleError(error));
  }

  return [];
};

export default getStoryData;
