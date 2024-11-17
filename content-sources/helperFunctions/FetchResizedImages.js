import resizer from "../resizer";
import setFocalCoords from "./setFocalCoords";

// This function parses the resized object returned by the resizer
// It handles both single and multiple resized images
export const parseResizedObject = (response) => {
  if (response == null) return response;

  const entries = Object.entries(response);

  // If there's only one entry, return it as a simple object
  if (entries.length === 1) {
    const [, value] = entries[0];
    return { src: value?.value?.src };
  }

  // If there are multiple entries, create an object with src for each entry
  return entries.reduce((acc, [key, value]) => {
    acc[key] = {
      src: value?.value?.src,
    };
    return acc;
  }, {});
};

// This function adds resized data to an image object
const addResizedData = async ({
  arcSite,
  imageToFetch,
  primarySize,
  secondarySize,
}) => {
  // Destructure necessary properties from the image object
  const {
    url,
    additional_properties: additionalProperties,
    focal_point: rootFocalPoint,
    auth,
    width: originalWidth,
    height: originalHeight,
  } = imageToFetch || {};

  // Get focal coordinates for the image
  const focalCoords = setFocalCoords(additionalProperties, rootFocalPoint);

  try {
    // Fetch resized image for primary size
    const imageResponse1 = await resizer.fetch({
      src: url,
      imageSize: primarySize,
      originalHeight,
      originalWidth,
      focalCoords,
      auth,
      arcSite,
    });

    // Fetch resized image for secondary size (if provided)
    const imageResponse2 = await resizer.fetch({
      src: url,
      imageSize: secondarySize,
      originalHeight,
      originalWidth,
      focalCoords,
      auth,
      arcSite,
    });

    // Return object with resized data, including both sizes if secondary size is provided
    return secondarySize?.length
      ? {
          ...imageToFetch,
          resized_obj: {
            primary: parseResizedObject(imageResponse1),
            secondary: parseResizedObject(imageResponse2),
          },
        }
      : {
          ...imageToFetch,
          resized_obj: {
            ...parseResizedObject(imageResponse1),
          },
        };
  } catch (error) {
    console.error("Error in addResizedData:", error);
    return imageToFetch; // Return original image if resizing fails
  }
};

// This function processes an element or array of elements, adding resized data where appropriate
const processElement = async ({
  arcSite,
  element,
  primarySize,
  secondarySize,
  contentSrc,
}) => {
  // If element is an array, process each item recursively
  if (Array.isArray(element)) {
    const processedElements = await Promise.all(
      element.map((el) =>
        processElement({
          arcSite,
          element: el,
          primarySize,
          secondarySize,
          contentSrc,
        })
      )
    );
    return processedElements;
  }

  // If element is an object, process it based on its type
  if (typeof element === "object" && element !== null) {
    // For 'image' type elements, add resized data
    if (element.type === "image") {
      const resizedImage = await addResizedData({
        arcSite,
        imageToFetch: element,
        primarySize,
        secondarySize,
      });
      return resizedImage;
    }

    // For 'DawgnationPlayer' type elements, add resized data for action_image_1
    if (element.__typename === "DawgnationPlayer") {
      const resizedImage = await addResizedData({
        arcSite,
        imageToFetch: { url: element.action_image_1 },
        primarySize,
      });
      return {
        ...element,
        resized_obj: resizedImage.resized_obj,
        primarySize,
      };
    }

    // For author search results with images, add resized data
    if (contentSrc === "author-search" && element.image) {
      const resizedImage = await addResizedData({
        arcSite,
        imageToFetch: { url: element.image },
        primarySize,
      });
      return {
        ...element,
        resized_obj: resizedImage.resized_obj,
      };
    }

    // For live-events content source
    if (contentSrc === "live-events" && element.url) {
      const resizedImage = await addResizedData({
        arcSite,
        imageToFetch: { url: element.url },
        primarySize,
      });
      return {
        ...element,
        resized_obj: resizedImage.resized_obj,
      };
    }

    // Process all properties of the object recursively
    const entries = await Promise.all(
      Object.entries(element).map(async ([key, value]) => {
        let primarySizeOverride = null;

        // Override primary size for gallery images in Content API and Live Updates
        if (
          (contentSrc === "content-api" || contentSrc === "live-updates") &&
          element.type === "gallery"
        ) {
          primarySizeOverride = [[0, 500]];
        }

        // Override primary size for lead images in Content API
        if (contentSrc === "content-api" && key === "promo_items") {
          primarySizeOverride = [
            [800, 450],
            [730, 400],
            [395, 220],
          ];
        }

        // Process the value recursively
        const processedValue = await processElement({
          arcSite,
          element: value,
          primarySize: primarySizeOverride || primarySize,
          secondarySize,
          contentSrc,
        });
        return [key, processedValue];
      })
    );

    return Object.fromEntries(entries);
  }

  // If element is neither an array nor an object, return it as is
  return element;
};

// Main function that initiates the processing of the data
export default async ({
  arcSite,
  data,
  primarySize,
  secondarySize,
  contentSrc,
}) => {
  if (data) {
    return processElement({
      arcSite,
      element: data,
      primarySize,
      secondarySize,
      contentSrc,
    });
  }

  return data;
};
