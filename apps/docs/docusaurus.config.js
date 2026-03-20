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
  scripts: [
    {
      src: "/js/navbar-active-fix.js",
      defer: true
    }
  ],
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
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 2
    },
    docs: {
      sidebar: {
        autoCollapseCategories: false
      }
    },
    navbar: {
      title: "MADS (Miterlab AI Design System)",
      items: [
        {
          to: "/",
          label: "Docs",
          position: "left",
          activeBaseRegex: "^/(?!extracted(?:/|$)).*"
        },
        {
          to: "/extracted",
          label: "Extracted",
          position: "left",
          activeBasePath: "/extracted"
        }
      ]
    }
  }
};

module.exports = config;
