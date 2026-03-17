import ReactMarkdown from "react-markdown";

interface MarkdownPageProps {
  markdown: string;
}

export const MarkdownPage = ({ markdown }: MarkdownPageProps) => {
  return (
    <article className="page">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </article>
  );
};
