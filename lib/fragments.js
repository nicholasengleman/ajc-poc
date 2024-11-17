// See: https://www.datocms.com/blog/offer-responsive-progressive-lqip-images-in-2020
export const responsiveImageFragment = `
  fragment responsiveImageFragment on ResponsiveImage {
    srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    base64
  }
`;

export const metaTagsFragment = `
  fragment metaTagsFragment on Tag {
    attributes
    content
    tag
  }
`;

export const contentSourceFields = `
  contentSource {
    contentSourceType
    size
    from
    collectionId
    daysBack
  }
`;

export const PkgLeadAutoFragment = `
  fragment PkgLeadAutoFragment on PkgleadautoRecord {
    __typename
    ${contentSourceFields}
    title
    titleLink
    imageOverrideId
    imageLinkUrl
    showLiveIcon
  }
`;

export const DontMissFragment = `
  fragment DontMissFragment on DontmissRecord {
     __typename
     ${contentSourceFields}
    title
  }
`;

export const RowFragment = `
  fragment RowFragment on RowRecord {
    mainContent {
      ... on PkgleadautoRecord {
        ...PkgLeadAutoFragment
      }
    }
    rightRail {
      ... on DontmissRecord {
        ...DontMissFragment
      }
    }
  }

  ${PkgLeadAutoFragment}
  ${DontMissFragment}
`;
