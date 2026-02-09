import { useParams } from "react-router";

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <article className="prose prose-gray max-w-none">
      {/* Phase 2: Breadcrumbs, meta line, tags, TOC, Portable Text body, related articles */}
      <h1>{slug}</h1>
      <p className="text-gray-400">
        Article content will be rendered here with Portable Text.
      </p>
    </article>
  );
}
