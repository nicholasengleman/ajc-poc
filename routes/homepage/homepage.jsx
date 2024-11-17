import { draftMode } from "next/headers";
import { toNextMetadata } from "react-datocms";

import { performRequest } from "@/lib/datocms";
import { RowFragment } from "@/lib/fragments";

import { DraftPostIndex } from "@/components/draft-post-index";
import { PostIndex } from "@/components/post-index";

const PAGE_CONTENT_QUERY = `
  query MyQuery {
  homepageLayout(filter: { slug: { eq: "/" } }) {
    id
    slug
    row1 {
       ...RowFragment
    }
    row2 {
       ...RowFragment
    } 
  }
}

 ${RowFragment}
`;

function getPageRequest(slug) {
  const { isEnabled } = draftMode();

  return {
    query: PAGE_CONTENT_QUERY,
    variables: { slug },
    includeDrafts: isEnabled,
  };
}

export async function generateMetadata() {
  // const { site, blog } = await performRequest(getPageRequest());

  // return toNextMetadata([...site.favicon, ...blog.seo]);

  return null;
}

export default async function Homepage({ params }) {
  const { isEnabled } = draftMode();
  const slug = params?.slug?.join("/") || "";

  const pageRequest = getPageRequest(slug);
  const data = await performRequest(pageRequest);
  const { homepageLayout } = data || {};

  if (isEnabled) {
    return (
      <DraftPostIndex
        subscription={{
          ...pageRequest,
          initialData: homepageLayout,
          token: process.env.NEXT_DATOCMS_API_TOKEN,
          environment: process.env.NEXT_DATOCMS_ENVIRONMENT || null,
        }}
      />
    );
  }

  return <PostIndex data={homepageLayout} />;
}
