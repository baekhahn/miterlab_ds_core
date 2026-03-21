import React, { useEffect, useMemo, useState } from "react";

type ExtractedItem = {
  slug: string;
  title: string;
  nodeName: string;
  nodeType: string;
  promotionStatus?: string;
  promotedAt?: string | null;
  isFigmaComponent: boolean;
  componentRole: string;
  mainComponentName?: string | null;
  variantProperties?: Record<string, string | boolean>;
  component?: {
    name: string;
    type: string;
    isFigmaComponent: boolean;
    role: string;
    mainComponentName: string | null;
  } | null;
  figmaProperties?: Array<{
    name: string;
    values: string[];
  }> | null;
  figmaVariants?: Array<{
    id: string;
    name: string;
    signature: string[];
  }> | null;
  figmaInstances?: Array<{
    name: string;
    role: string;
  }> | null;
  properties?: {
    variantProperties: Record<string, string | boolean>;
    enabled: string[];
    summary: string[];
    groups: Array<{
      label: string;
      items: string[];
    }>;
    hierarchy: Array<{
      name: string;
      value: string;
      children: Array<{
        name: string;
        value: string;
      }>;
    }>;
  } | null;
  nestedInstances?: {
    present: string[];
    available: string[];
  } | null;
  resolvedStructure?: {
    kind: string;
    slots: string[];
    flow: string[];
  } | null;
  semantics?: {
    headline: string;
    notes: string[];
  } | null;
  metricsSummary?: string[];
  insight?: {
    kind: string;
    headline: string;
    structure: string[];
    notes: string[];
    metrics: string[];
    detectedSlots: string[];
  } | null;
  fileKey: string;
  nodeId: string;
  extractedAt: string;
  dir: string;
  svgPath: string;
  interpretedSvgPath: string;
};

const BRIDGE_URL = "http://127.0.0.1:8787";

const formatVariants = (variantProperties?: Record<string, string | boolean>) => {
  const entries = Object.entries(variantProperties ?? {});
  if (entries.length === 0) return null;
  return entries.map(([key, value]) => `${key}=${value}`).join(", ");
};

const getPropertyText = (item: ExtractedItem) => {
  const summarized = item.properties?.summary?.length ? item.properties.summary.join(", ") : null;
  if (summarized) return summarized;
  const explicit = formatVariants(item.properties?.variantProperties);
  if (explicit) return explicit;
  return formatVariants(item.variantProperties);
};

export default function ExtractedGallery() {
  const [items, setItems] = useState<ExtractedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [deletingSlug, setDeletingSlug] = useState("");
  const [promotingSlug, setPromotingSlug] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/extracted/index.json?ts=${Date.now()}`);
      if (!response.ok) throw new Error("Extracted index를 불러오지 못했습니다.");
      const next = (await response.json()) as ExtractedItem[];
      setItems(next);
      setStatus("");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const empty = useMemo(() => !loading && items.length === 0, [items.length, loading]);

  const handleDelete = async (slug: string) => {
    setDeletingSlug(slug);
    setStatus("");
    try {
      const response = await fetch(`${BRIDGE_URL}/delete-extraction`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slug })
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || "삭제에 실패했습니다.");
      }
      setItems((current) => current.filter((item) => item.slug !== slug));
    } catch (error) {
      setStatus(error instanceof Error ? error.message : String(error));
    } finally {
      setDeletingSlug("");
    }
  };

  const handlePromote = async (slug: string) => {
    setPromotingSlug(slug);
    setStatus("");
    try {
      const response = await fetch(`${BRIDGE_URL}/promote-extraction`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slug })
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || "정식 반영 처리에 실패했습니다.");
      }
      setItems((current) =>
        current.map((item) =>
          item.slug === slug
            ? {
                ...item,
                promotionStatus: "accepted",
                promotedAt: result?.promotedAt ?? new Date().toISOString()
              }
            : item
        )
      );
    } catch (error) {
      setStatus(error instanceof Error ? error.message : String(error));
    } finally {
      setPromotingSlug("");
    }
  };

  return (
    <div className="extracted-gallery">
      {status ? <p className="extracted-status">{status}</p> : null}
      {loading ? <p className="extracted-status">추출 목록을 불러오는 중입니다.</p> : null}
      {empty ? <p className="extracted-status">아직 extraction artifact가 없습니다.</p> : null}

      {items.map((item) => (
        <section className="extracted-card" key={`${item.slug}-${item.nodeId}`}>
          <div className="extracted-card-header">
            <h2>{item.title}</h2>
            <div className="extracted-card-actions">
              <button
                type="button"
                className="extracted-promote"
                onClick={() => void handlePromote(item.slug)}
                disabled={item.promotionStatus === "accepted" || promotingSlug === item.slug}
              >
                {item.promotionStatus === "accepted"
                  ? "정식 반영됨"
                  : promotingSlug === item.slug
                    ? "처리 중..."
                    : "정식 반영"}
              </button>
              <button
                type="button"
                className="extracted-delete"
                onClick={() => void handleDelete(item.slug)}
                disabled={deletingSlug === item.slug}
                aria-label={`${item.title} 삭제`}
                title="삭제"
              >
                {deletingSlug === item.slug ? "..." : "🗑"}
              </button>
            </div>
          </div>

          <div className="extracted-preview-block">
            <img className="extracted-preview" src={item.interpretedSvgPath} alt={`${item.nodeName} interpreted`} />
          </div>

          {item.semantics || item.resolvedStructure || item.metricsSummary?.length || item.properties ? (
            <div className="extracted-insight">
              {item.semantics?.headline ? (
                <p className="extracted-insight-headline">{item.semantics.headline}</p>
              ) : item.insight ? (
                <p className="extracted-insight-headline">{item.insight.headline}</p>
              ) : null}
              {item.properties?.groups?.length ? (
                <div className="extracted-property-groups">
                  {item.properties.groups.map((group) => (
                    <div className="extracted-property-group" key={group.label}>
                      <p className="extracted-insight-line">
                        {group.label}: <code>{group.items.join(", ")}</code>
                      </p>
                    </div>
                  ))}
                </div>
              ) : getPropertyText(item) ? (
                <p className="extracted-insight-line">
                  Component Properties: <code>{getPropertyText(item)}</code>
                </p>
              ) : null}
              {item.properties?.hierarchy?.length ? (
                <div className="extracted-property-hierarchy">
                  <p className="extracted-insight-line">
                    Component Property Hierarchy:
                  </p>
                  <ul className="extracted-insight-list">
                    {item.properties.hierarchy.map((entry) => (
                      <li key={`${entry.name}-${entry.value}`}>
                        <code>{entry.name}: {entry.value}</code>
                        {entry.children.length ? (
                          <>{" "}→ <code>{entry.children.map((child) => `${child.name}: ${child.value}`).join(", ")}</code></>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {item.nestedInstances?.present?.length || item.nestedInstances?.available?.length ? (
                <div className="extracted-nested-instances">
                  {item.nestedInstances.present.length ? (
                    <p className="extracted-insight-line">
                      Nested Instances (present): <code>{item.nestedInstances.present.join(", ")}</code>
                    </p>
                  ) : null}
                  {item.nestedInstances.available.length ? (
                    <p className="extracted-insight-line">
                      Nested Instances (available): <code>{item.nestedInstances.available.join(", ")}</code>
                    </p>
                  ) : null}
                </div>
              ) : null}
              {item.figmaProperties?.length ? (
                <div className="extracted-figma-properties">
                  <p className="extracted-insight-line">
                    Figma Properties:
                  </p>
                  <ul className="extracted-insight-list">
                    {item.figmaProperties.map((entry) => (
                      <li key={entry.name}>
                        <code>{entry.name}: {entry.values.join(", ")}</code>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {item.figmaVariants?.length ? (
                <div className="extracted-figma-variants">
                  <p className="extracted-insight-line">
                    Figma Variants:
                  </p>
                  <ul className="extracted-insight-list">
                    {item.figmaVariants.slice(0, 8).map((variant) => (
                      <li key={variant.id}>
                        <code>{variant.name}</code>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {item.resolvedStructure?.flow?.length ? (
                <p className="extracted-insight-line">
                  Resolved Structure: <code>{item.resolvedStructure.flow.join(" -> ")}</code>
                </p>
              ) : null}
              {item.resolvedStructure?.slots?.length ? (
                <p className="extracted-insight-line">
                  Slots: <code>{item.resolvedStructure.slots.join(", ")}</code>
                </p>
              ) : item.insight?.detectedSlots?.length ? (
                <p className="extracted-insight-line">
                  Slots: <code>{item.insight.detectedSlots.join(", ")}</code>
                </p>
              ) : null}
              {(item.metricsSummary?.length || item.insight?.metrics?.length) ? (
                <ul className="extracted-insight-list">
                  {(item.metricsSummary?.length ? item.metricsSummary : item.insight?.metrics ?? []).map((metric) => (
                    <li key={metric}>{metric}</li>
                  ))}
                </ul>
              ) : null}
              {(item.semantics?.notes?.length || item.insight?.notes?.length) ? (
                <ul className="extracted-insight-list">
                  {(item.semantics?.notes?.length ? item.semantics.notes : item.insight?.notes ?? []).map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}

          <ul className="extracted-meta">
            <li>Status: <code>{item.promotionStatus ?? "draft"}</code></li>
            {item.promotedAt ? <li>Promoted At: <code>{item.promotedAt}</code></li> : null}
            <li>Node: <code>{item.nodeName}</code></li>
            <li>Type: <code>{item.nodeType}</code></li>
            <li>Figma Component: <code>{item.isFigmaComponent ? "yes" : "no"}</code></li>
            {item.isFigmaComponent ? <li>Component Role: <code>{item.componentRole}</code></li> : null}
            {item.mainComponentName ? <li>Main Component: <code>{item.mainComponentName}</code></li> : null}
            {item.properties?.groups?.length
              ? item.properties.groups.map((group) => (
                  <li key={group.label}>
                    {group.label}: <code>{group.items.join(", ")}</code>
                  </li>
                ))
              : getPropertyText(item)
                ? <li>Component Properties: <code>{getPropertyText(item)}</code></li>
                : null}
            {item.nestedInstances?.present?.length ? (
              <li>Nested Instances (present): <code>{item.nestedInstances.present.join(", ")}</code></li>
            ) : null}
            {item.nestedInstances?.available?.length ? (
              <li>Nested Instances (available): <code>{item.nestedInstances.available.join(", ")}</code></li>
            ) : null}
            {item.figmaProperties?.length ? (
              <li>Figma Properties: <code>{item.figmaProperties.map((entry) => `${entry.name}: ${entry.values.join(", ")}`).join(" / ")}</code></li>
            ) : null}
            {item.figmaVariants?.length ? (
              <li>Figma Variants: <code>{item.figmaVariants.length}</code></li>
            ) : null}
            {item.figmaInstances?.length ? (
              <li>Figma Instances: <code>{item.figmaInstances.map((entry) => `${entry.name} (${entry.role})`).join(", ")}</code></li>
            ) : null}
            <li>File Key: <code>{item.fileKey}</code></li>
            <li>Node ID: <code>{item.nodeId}</code></li>
            <li>Extracted At: <code>{item.extractedAt}</code></li>
            <li>Artifact Dir: <code>{item.dir}</code></li>
          </ul>
        </section>
      ))}
    </div>
  );
}
