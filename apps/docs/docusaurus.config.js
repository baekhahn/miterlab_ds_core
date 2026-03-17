// @ts-check

const config = {
  title: "Miterlab AI Design System",
  tagline: "Frozen core schema, parity, and runtime reference",
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
        { to: "/freeze-review/status", label: "Freeze Review", position: "left" }
      ]
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Core",
          items: [{ label: "Overview", to: "/core/overview" }]
        },
        {
          title: "Families",
          items: [{ label: "Family Index", to: "/families/" }]
        },
        {
          title: "Runtime",
          items: [{ label: "Plugin Contract", to: "/runtime/plugin-contract" }]
        }
      ]
    }
  }
};

module.exports = config;
