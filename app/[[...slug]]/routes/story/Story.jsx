import { StoryLayout } from "./StoryLayout";
import getContent from "@/content-sources/content-api";

export default async function Story({ id, slug }) {
  const data = await getContent({ id });

  return <StoryLayout data={data} slug={slug} />;
}
