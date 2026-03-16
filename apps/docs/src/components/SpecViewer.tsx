import { load } from "js-yaml";

interface SpecViewerProps {
  rawSpec: string;
}

interface ParsedSpec {
  component?: string;
  status?: string;
  purpose?: string;
  model?: { axes?: string[] };
  variants?: string[];
  selected?: boolean[];
  sizes?: string[];
  states?: string[];
  semanticMapping?: Record<string, unknown>;
}

const toCode = (value: unknown) => JSON.stringify(value, null, 2);

export const SpecViewer = ({ rawSpec }: SpecViewerProps) => {
  const parsed = (load(rawSpec) ?? {}) as ParsedSpec;

  return (
    <article className="page">
      <h1>{parsed.component ?? "Component"}</h1>
      <p>{parsed.purpose}</p>

      <section className="spec-grid">
        <div className="card">
          <strong>Status</strong>
          <div>{parsed.status ?? "draft"}</div>
        </div>
        <div className="card">
          <strong>Axes</strong>
          <div>{(parsed.model?.axes ?? []).join(", ")}</div>
        </div>
        <div className="card">
          <strong>Variants</strong>
          <div>{(parsed.variants ?? []).join(", ") || "-"}</div>
        </div>
        <div className="card">
          <strong>Selected</strong>
          <div>{(parsed.selected ?? []).join(", ") || "-"}</div>
        </div>
        <div className="card">
          <strong>Sizes</strong>
          <div>{(parsed.sizes ?? []).join(", ") || "-"}</div>
        </div>
        <div className="card">
          <strong>States</strong>
          <div>{(parsed.states ?? []).join(", ") || "-"}</div>
        </div>
      </section>

      <h2>Semantic Token Mapping</h2>
      <pre className="code">{toCode(parsed.semanticMapping ?? {})}</pre>
    </article>
  );
};
