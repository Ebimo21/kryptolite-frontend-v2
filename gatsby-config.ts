import path from "path";
import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `kryptolite-frontend-v2`,
    siteUrl: `https://www.yourdomain.tld`,
    description: "KRYPTOLITE - the next 100X DeFi gem you don't want to miss",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      //@ts-ignore
      __key: "images",
    },
    {
      resolve: "gatsby-plugin-layout",
      options: {
        component: path.resolve("./src/components/Layouts/index.tsx"),
      },
    },
  ],
};

export default config;
