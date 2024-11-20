import { PkgLeadAutoFragment } from "fragments/featureFragments";

export const PAGE_CONTENT_QUERY = `
  {
    sectionfront {
      id
      slug
      mainContent {
        __typename
        ... on PkgleadautoRecord {
          ...PkgLeadAutoFragment
        }
      }
    }
  }

  ${PkgLeadAutoFragment}
`;
