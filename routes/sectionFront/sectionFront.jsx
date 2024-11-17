import { draftMode } from "next/headers";
import { toNextMetadata } from "react-datocms";

import { performRequest } from "@/lib/datocms";
import { PkgLeadAutoFragment } from "@/lib/fragments";

import { DraftPostIndex } from "@/components/draft-post-index";
import { PostIndex } from "@/components/post-index";

const PAGE_CONTENT_QUERY = `
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

function getPageRequest() {
  const { isEnabled } = draftMode();

  return { query: PAGE_CONTENT_QUERY, includeDrafts: isEnabled };
}

export async function generateMetadata() {
  // const { site, blog } = await performRequest(getPageRequest());

  // return toNextMetadata([...site.favicon, ...blog.seo]);

  return null;
}

export default async function SectionFront() {
  const { isEnabled } = draftMode();

  const pageRequest = getPageRequest();
  const data = await performRequest(pageRequest);

  if (isEnabled) {
    return (
      <DraftPostIndex
        subscription={{
          ...pageRequest,
          initialData: data,
          token: process.env.NEXT_DATOCMS_API_TOKEN,
          environment: process.env.NEXT_DATOCMS_ENVIRONMENT || null,
        }}
      />
    );
  }

  return <PostIndex data={data} />;
}
