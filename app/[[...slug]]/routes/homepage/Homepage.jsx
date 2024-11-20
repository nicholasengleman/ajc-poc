import { draftMode } from "next/headers";
import { performRequest } from "@/lib/datocms";
import { PAGE_CONTENT_QUERY } from "./query";
import { DraftModeWrapper } from "components/DraftModeWrapper";
import { SectionFrontLayout } from "../sectionFront/SectionFrontLayout";

function getPageRequest(slug) {
  const { isEnabled } = draftMode();

  return {
    query: PAGE_CONTENT_QUERY,
    variables: { slug },
    includeDrafts: isEnabled,
  };
}

export default async function Homepage({ params }) {
  const { isEnabled } = draftMode();
  const slug = params?.slug?.join("/") || "";

  const pageRequest = getPageRequest(slug);
  const data = await performRequest(pageRequest);
  const { homepageLayout } = data || {};

  // if (isEnabled) {
  //   return (
  //     <DraftModeWrapper
  //       subscription={{
  //         ...pageRequest,
  //         initialData: homepageLayout,
  //         token: process.env.NEXT_DATOCMS_API_TOKEN,
  //         environment: process.env.NEXT_DATOCMS_ENVIRONMENT || null,
  //       }}
  //     />
  //   );
  // }

  return <SectionFrontLayout data={homepageLayout} />;
}
