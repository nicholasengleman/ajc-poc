import SectionFront from "../../routes/sectionFront/sectionFront";
import Homepage from "../../routes/homepage/homepage";
import Story from "../../routes/story/story";

export default async function Page({ params }) {
  // Check if the last segment matches the 26-character alphanumeric pattern
  const lastSegment = params?.slug?.[params?.slug?.length - 1];
  const isHomepage = !params;
  const isStory = /^[a-zA-Z0-9]{26}$/.test(lastSegment);

  return <Homepage />;
}
