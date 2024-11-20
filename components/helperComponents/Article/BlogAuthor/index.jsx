import Image from "components/helperComponents/Image";
import NextImage from "next/image";
import "./styles.scss";

const BlogAuthor = ({ subtype, authorData }) => {
  if (
    subtype !== "Flatpage" &&
    subtype !== "Wire" &&
    authorData &&
    authorData.length > 0
  ) {
    const arcSite = "ajc";
    // const { burgerFbLogo, burgerTwitterLogo } = getProperties(arcSite);
    // const appContext = useAppContext();
    // const { deployment, contextPath } = appContext;

    const buildAuthorImage = (author) => {
      const { _id: id, image } = author;
      console.log("author", image);
      if (id) {
        return (
          <a href={`/staff/${id}/`} rel="author">
            <div className="content-profileImage">
              <NextImage
                src={image.url}
                alt="Author Image"
                width={100}
                height={100}
              />
            </div>
          </a>
        );
        // eslint-disable-next-line no-else-return
      } else {
        return (
          <div className="content-profileImage">
            <Image src={image} alt="Author Image" width={100} height={100} />
          </div>
        );
      }
    };

    const buildAuthorName = (author) => {
      const authorName = author?.additional_properties?.original?.byline;
      const { _id: id, name } = author;
      if (id) {
        return (
          <a href={`/staff/${id}/`} rel="author">
            {authorName || name}
          </a>
        );
        // eslint-disable-next-line no-else-return
      } else {
        return authorName || name;
      }
    };

    return (
      <div
        className={`c-blogAuthor b-margin-bottom-30 ${
          authorData.length > 1 ? "multiple-authors" : ""
        }`}
      >
        <p className="blogAuthor-title">
          About the Author{authorData.length > 1 ? "s" : ""}
        </p>
        {authorData.map((author, index) => {
          const {
            type: authorType,
            referent,
            image,
            social_links: socialLinks,
            name,
            description,
          } = author;
          const { id: referentId } = referent || {};
          let referentName = "";
          let isReferentAuthor = false;
          if (authorType === "reference") {
            isReferentAuthor = true;
            const nameArray = referentId
              .toLowerCase()
              .split("-")
              .map((s) => s.charAt(0).toUpperCase() + s.substring(1));
            referentName = nameArray.join(" ");
          }
          return (
            <div key={`blog-author-${index}`} className="blog-author-content">
              <div
                className={`b-flexRow blog-author-content-heading ${
                  image && image.url ? "has-image" : ""
                }`}
              >
                {image && image.url && buildAuthorImage(author)}
                <div className="content-authorName">
                  {isReferentAuthor ? referentName : buildAuthorName(author)}
                  {socialLinks && (
                    <div className="content-authorSocial">
                      {socialLinks.map((link, i) => {
                        const { site: network, url } = link;
                        const isFb = network === "facebook";
                        const isTwitter = network === "twitter";
                        // if ((isFb || isTwitter) && url) {
                        //   const logoSrc = isFb
                        //     ? deployment(`${contextPath}${burgerFbLogo}`)
                        //     : deployment(`${contextPath}${burgerTwitterLogo}`);
                        //   return (
                        //     <a
                        //       key={i}
                        //       href={
                        //         url.indexOf('http') !== 0 &&
                        //         url.indexOf('//') !== 0
                        //           ? `//${url}`
                        //           : url
                        //       }
                        //     >
                        //       <img
                        //         src={logoSrc}
                        //         alt={`Follow ${name} on ${network}`}
                        //         width={17}
                        //         height={17}
                        //       />
                        //     </a>
                        //   );
                        // }
                        return false;
                      })}
                    </div>
                  )}
                </div>
              </div>
              {authorData.length < 2 && description && (
                <div className="b-flexRow">
                  <p className="content-authorDescription">{description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

export default BlogAuthor;
