// @ts-check

const config = {
  title: "Miterlab AI Design System",
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
      title: "Miterlab AI Design System",
      items: [
        { to: "/", label: "Docs", position: "left" },
        { to: "/contracts/button-contract", label: "Button Contract", position: "left" },
        { to: "/contracts/input-contract", label: "Input Contract", position: "left" },
        { to: "/freeze-review/status", label: "Freeze Review", position: "left" }
      ]
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [{ label: "Home", to: "/" }]
        },
        {
          title: "Contracts",
          items: [
            { label: "Button Contract", to: "/contracts/button-contract" },
            { label: "Input Contract", to: "/contracts/input-contract" }
          ]
        },
        {
          title: "Freeze Review",
          items: [
            { label: "Freeze Review", to: "/freeze-review/status" }
          ]
        }
      ]
    }
  }
};

module.exports = config;
