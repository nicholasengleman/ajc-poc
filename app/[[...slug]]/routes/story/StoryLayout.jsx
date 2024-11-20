import Header from "../../../../components/features/Header";
import Article from "components/helperComponents/Article";

export function StoryLayout({ data, slug }) {
  return (
    <>
      <Header />
      <Article globalContent={data} slug={slug} />
    </>
  );
}
