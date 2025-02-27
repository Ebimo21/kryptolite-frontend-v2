import React from "react";
import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
// import ogImage from "../images/avax-trees-bg-large.jpg";
// import twitterImage from "../images/avax-trees-bg-small.jpg";
import ogImage from "../images/icon.png";
import twitterImage from "../images/icon.png";

interface SEOProps {
  description: string;
  meta?: any[];
  slug?: string;
  title?: string;
  lang?: string;
  image?: { og: string; twitter: string };
}

const query = graphql`
  query GetSiteMetadata {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
  }
`;

function SEO({ meta = [], title = "", description, slug = "", lang = "en", image }: SEOProps) {
  return (
    <StaticQuery
      query={query}
      render={(data) => {
        const { siteMetadata } = data.site;
        const metaDescription = description || siteMetadata.description;
        const metaImages = image ? image : { og: ogImage, twitter: twitterImage };
        const getMetaImageUrl = (image: string) => `${siteMetadata.siteUrl}${image}`;
        const url = `${siteMetadata.siteUrl}${slug}`;
        const twitterUrl = "@KryptoliteSwap";
        return (
          <Helmet
            htmlAttributes={{ lang }}
            {...(title
              ? {
                  titleTemplate: `%s — ${siteMetadata.title}`,
                  title,
                }
              : {
                  title: `${siteMetadata.title} — Official website`,
                })}
            meta={[
              {
                name: "description",
                content: metaDescription,
              },
              {
                property: "og:url",
                content: url,
              },
              {
                property: "og:title",
                content: title || siteMetadata.title,
              },
              {
                property: "og:description",
                content: metaDescription,
              },
              {
                name: "twitter:card",
                content: "summary",
              },
              {
                name: "twitter:creator",
                content: twitterUrl,
              },
              {
                name: "twitter:title",
                content: title || siteMetadata.title,
              },
              {
                name: "twitter:description",
                content: metaDescription,
              },
            ]
              .concat([
                {
                  property: "og:image",
                  content: getMetaImageUrl(metaImages.og),
                },
                {
                  name: "twitter:image",
                  content: getMetaImageUrl(metaImages.twitter),
                },
              ])
              .concat(meta)}
          />
        );
      }}
    />
  );
}

export default SEO;
