import { RowWithRightRailFragment } from "fragments/blockFragments";

export const PAGE_CONTENT_QUERY = `
  query MyQuery {
  homepageLayout(filter: { slug: { eq: "/" } }) {
    id
    slug
    row1 {
       ...RowWithRightRailFragment
    }
    row2 {
       ...RowWithRightRailFragment
    } 
  }
}

 ${RowWithRightRailFragment}
`;
