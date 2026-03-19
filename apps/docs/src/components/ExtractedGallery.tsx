import React, { useEffect, useMemo, useState } from "react";

type ExtractedItem = {
  slug: string;
  title: string;
  nodeName: string;
  nodeType: string;
  isFigmaComponent: boolean;
  componentRole: string;
  mainComponentName?: string | null;
  variantProperties?: Record<string, string | boolean>;
  fileKey: string;
  nodeId: string;
  extractedAt: string;
  dir: string;
  svgPath: string;
};

const BRIDGE_URL = "http://127.0.0.1:8787";

const formatVariants = (variantProperties?: Record<string, string | boolean>) => {
  const entries = Object.entries(variantProperties ?? {});
  if (entries.length === 0) return null;
  return entries.map(([key, value]) => `${key}=${value}`).join(", ");
};

export default function ExtractedGallery() {
  const [items, setItems] = useState<ExtractedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [deletingSlug, setDeletingSlug] = useState("");

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

  return (
    <div className="extracted-gallery">
      {status ? <p className="extracted-status">{status}</p> : null}
      {loading ? <p className="extracted-status">추출 목록을 불러오는 중입니다.</p> : null}
      {empty ? <p className="extracted-status">아직 extraction artifact가 없습니다.</p> : null}

      {items.map((item) => (
        <section className="extracted-card" key={`${item.slug}-${item.nodeId}`}>
          <div className="extracted-card-header">
            <h2>{item.title}</h2>
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

          <img className="extracted-preview" src={item.svgPath} alt={item.nodeName} />

          <ul className="extracted-meta">
            <li>Node: <code>{item.nodeName}</code></li>
            <li>Type: <code>{item.nodeType}</code></li>
            <li>Figma Component: <code>{item.isFigmaComponent ? "yes" : "no"}</code></li>
            {item.isFigmaComponent ? <li>Component Role: <code>{item.componentRole}</code></li> : null}
            {item.mainComponentName ? <li>Main Component: <code>{item.mainComponentName}</code></li> : null}
            {formatVariants(item.variantProperties) ? <li>Variants: <code>{formatVariants(item.variantProperties)}</code></li> : null}
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
