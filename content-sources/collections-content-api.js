/* eslint-disable no-console */
import pick from "lodash-es/pick";
import AddFirstInlineImage from "./helperFunctions/AddFirstInlineImage";
import FilterElements from "./helperFunctions/FilterElements";
import GetCollectionData from "./helperFunctions/GetCollectionData";
import RelatedStoryData from "./helperFunctions/getRelatedStoryData";
import getStoryData from "./helperFunctions/getStoryData";
import handleError from "./helperFunctions/handleError";
import getImageRequirements from "./helperFunctions/getImageRequirements";

const CollectionsContentApi = (query) => {
  const {
    arcSite = "ajc",
    collectionId: id,
    size = 12,
    from,
    displayClass = "",
    displayClassesRequiringImg = [],
    primarySize = [[500, 280]],
    secondarySize,
    secondarySizeUseAfter,
    excludeTheseStoryIds = [],
    getRelatedData = false,
  } = query;

  const requiresImageEveryX = getImageRequirements(
    displayClass,
    displayClassesRequiringImg
  );
  return GetCollectionData(arcSite, id, size, from)
    .then((data) =>
      data.filter((story) =>
        excludeTheseStoryIds.every(
          (excludedStoryId) => excludedStoryId !== story?._id
        )
      )
    )
    .then((data) => getStoryData(arcSite, data))
    .catch((error) => handleError(error));
};

export default CollectionsContentApi;
