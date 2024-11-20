import { draftMode } from "next/headers";
import { performRequest } from "@/lib/datocms";
import { PAGE_CONTENT_QUERY } from "./query";
import { DraftModeWrapper } from "components/DraftModeWrapper";
import { SectionFrontLayout } from "../sectionFront/SectionFrontLayout";

function getPageRequest() {
  const { isEnabled } = draftMode();

  return { query: PAGE_CONTENT_QUERY, includeDrafts: isEnabled };
}

export default async function SectionFront() {
  const { isEnabled } = draftMode();

  const pageRequest = getPageRequest();
  const data = await performRequest(pageRequest);

  if (isEnabled) {
    return (
      <DraftModeWrapper
        subscription={{
          ...pageRequest,
          initialData: data,
          token: process.env.NEXT_DATOCMS_API_TOKEN,
          environment: process.env.NEXT_DATOCMS_ENVIRONMENT || null,
        }}
      />
    );
  }

  return <SectionFrontLayout data={data} />;
}
