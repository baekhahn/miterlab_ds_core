// @ts-check

const config = {
  title: "MADS (Miterlab AI Design System)",
  tagline: "Button and Input core contracts for AI generation",
  favicon: "img/favicon.ico",
  url: "https://mads.fly.dev",
  baseUrl: "/",
  organizationName: "miterlab",
  projectName: "mads",
  onBrokenLinks: "throw",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn"
    }
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en"]
  },
  presets: [
    [
      "classic",
      {
        docs: {
          path: "docs",
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js")
        },
        blog: false,
        pages: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css")
        }
      }
    ]
  ],
  themeConfig: {
    navbar: {
      title: "MADS (Miterlab AI Design System)",
      items: [
        { to: "/", label: "Docs", position: "left" }
      ]
    }
  }
};

module.exports = config;
