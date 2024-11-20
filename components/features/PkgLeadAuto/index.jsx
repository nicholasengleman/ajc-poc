import Link from "next/link";
import StoryTease from "@/components/helperComponents/StoryTease";
import useBreakpoints from "@/hooks/useBreakpoints";
import Image from "components/helperComponents/Image";
import handleSiteName from "@/functions/handleSiteName";
import { useContent } from "@/hooks/useContent";
import "./default.scss";

const PkgLeadAuto = async ({ customFields }) => {
  const arcSite = "ajc";
  const env = "sandbox";

  const {
    contentSource,
    title,
    titleLink,
    imageOverrideId,
    imageLinkUrl,
    videoType,
    videoId,
    customShowLink,
    showLiveIcon,
    autoplay,
    ads,
    loopVideo,
    isTeaser,
    noAutoAdvance,
  } = customFields;

  const { contentSourceType, ...contentSourceQuery } = contentSource;

  const data = await useContent({
    source: contentSourceType,
    query: {
      ...contentSourceQuery,
    },
    transform: (res) => {
      return res?.slice(0, 4);
    },
  });

  // const { isDesktopMd } = useBreakpoints();

  const getStories = () =>
    data?.map((story, i) =>
      i > 0 ? <StoryTease key={i} story={story} hideDescription={true} /> : null
    );

  const getTitle = (text, textLink) => {
    if (!text) {
      return null;
    }

    if (!textLink) {
      return <p className="title">{text}</p>;
    }

    return (
      <a className="title" href={textLink}>
        {text}
      </a>
    );
  };

  const {
    canonical_url: canonicalUrl,
    canonical_website: canonicalSite,
    website_url: websiteUrl,
    teaseImageObject,
  } = data?.[0] || {};

  const relativeURL = websiteUrl || canonicalUrl || "/";
  const finalURL =
    canonicalSite && canonicalSite !== arcSite && arcSite === "ajc"
      ? `//${env !== "prod" ? "sandbox" : "www"}.${handleSiteName(
          canonicalSite
        )}.com${relativeURL}`
      : relativeURL;

  const isSingleItemClass = data?.length === 1 ? "single-item" : "";

  const imageSrcObject = teaseImageObject;
  const imageHref = imageLinkUrl || finalURL;

  const block2Class = showLiveIcon ? "block-2 block-2-padding-top" : "block-2";

  const renderStories = () => (
    <>
      <div className={block2Class}>
        <StoryTease story={data?.[0]} largeText={true} />
        {getStories()}
      </div>
    </>
  );

  return (
    <div
      className="c-pkg-lead-auto b-margin-bottom-d30-m20"
      data-sectiontitle={`${title || "Feat Pkg Lead Auto"}`}
    >
      {getTitle(title, titleLink)}
      <div className={`content ${isSingleItemClass} top-border`}>
        <Link href={imageHref} className="block-1 img-override-aspect">
          <Image
            src={data[0].promo_items.basic.url}
            width={1260}
            height={480}
            alt="Lead Image"
          />
          {/* <Image src={imageSrcObject} imageType="isFeatureImage" /> */}
        </Link>
        {!videoType && !videoId && renderStories()}
      </div>
    </div>
  );
};

export default PkgLeadAuto;
