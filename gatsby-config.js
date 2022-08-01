module.exports = {
  siteMetadata: {
    title: `KRYPTOLITE - the next 100X DeFi gem you don't want to miss`,
    // siteUrl: `https://kryptolite.rocks`,
    siteUrl: `https://kryptolite-rocks.netlify.app`,
    description: "KRYPTOLITE - the next 100X DeFi gem you don't want to miss",
  },
  trailingSlash: "never",
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
        component: require.resolve("./src/components/GlobalAppWrapper.tsx"),
      },
    },
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: "#80CC18",
        showSpinner: true,
      },
    },
    {
      resolve: "gatsby-plugin-anchor-links",
      options: {
        offset: -100,
      },
    },
    "gatsby-plugin-no-sourcemaps",
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: process.env.GA_TRACKING_ID,

        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: true,

        // Defaults to false
        enableWebVitalsTracking: true,
      },
    },
  ],
};
