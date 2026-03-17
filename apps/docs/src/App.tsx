import { useMemo, useSyncExternalStore } from "react";
import { ComponentSpecPage } from "./components/ComponentSpecPage";
import { MarkdownPage } from "./components/MarkdownPage";
import { SpecViewer } from "./components/SpecViewer";
import { componentDocById } from "./content/componentDocs";
import { docsMarkdownById } from "./content/docs";
import { componentSpecById } from "./content/specs";
import { defaultPageId, navItems } from "./lib/navigation";

const getHash = () => window.location.hash.replace("#", "") || defaultPageId;
const subscribe = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};

export const App = () => {
  const pageId = useSyncExternalStore(subscribe, getHash, () => defaultPageId);

  const current = useMemo(() => {
    if (docsMarkdownById[pageId]) {
      return <MarkdownPage markdown={docsMarkdownById[pageId]} />;
    }
    if (componentSpecById[pageId] && componentDocById[pageId]) {
      return <ComponentSpecPage markdown={componentDocById[pageId]} rawSpec={componentSpecById[pageId]} />;
    }
    if (componentSpecById[pageId]) {
      return <SpecViewer rawSpec={componentSpecById[pageId]} />;
    }
    return <MarkdownPage markdown={docsMarkdownById[defaultPageId]} />;
  }, [pageId]);

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brand">Miterlab DS Docs</div>

        <div className="nav-group">
          <div className="nav-title">Sections</div>
          {navItems
            .filter((item) => item.group === "docs")
            .map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${pageId === item.id ? "active" : ""}`}
              >
                {item.label}
              </a>
            ))}
        </div>

        <div className="nav-group">
          <div className="nav-title">Component Specs</div>
          {navItems
            .filter((item) => item.group === "components")
            .map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${pageId === item.id ? "active" : ""}`}
              >
                {item.label}
              </a>
            ))}
        </div>
      </aside>

      <main className="main">{current}</main>
    </div>
  );
};
