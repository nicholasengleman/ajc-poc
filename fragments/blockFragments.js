import { PkgLeadAutoFragment, DontMissFragment } from "./featureFragments";

export const RowWithRightRailFragment = `
  fragment RowWithRightRailFragment on RowWithRightRailRecord {
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
