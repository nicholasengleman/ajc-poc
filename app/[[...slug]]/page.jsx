import { headers } from "next/headers";
import SectionFront from "./routes/sectionFront/SectionFront";
import Homepage from "./routes/homepage/homepage";
import Story from "./routes/story/Story";

export default async function Page({ params }) {
  const headersList = headers();
  // Check if the last segment matches the 26-character alphanumeric pattern
  const lastSegment = params?.slug?.[params?.slug?.length - 1];
  const isHomepage = Object.keys(params).length === 0;
  const isStory = /^[a-zA-Z0-9]{26}$/.test(lastSegment);
  const path = headersList.get("referer") || "/";

  if (isStory) {
    return <Story id={lastSegment} slug={path} />;
  } else if (isHomepage) {
    return <Homepage />;
  }
  // else {
  //   return <SectionFront />;
  // }
}
