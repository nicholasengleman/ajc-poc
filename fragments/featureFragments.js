const contentSourceFields = `
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
