import ReactMarkdown from "react-markdown";
import { SpecViewer } from "./SpecViewer";

interface ComponentSpecPageProps {
  markdown: string;
  rawSpec: string;
}

export const ComponentSpecPage = ({ markdown, rawSpec }: ComponentSpecPageProps) => {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <article className="page">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </article>
      <SpecViewer rawSpec={rawSpec} />
    </div>
  );
};
