import { useSearchParams } from "react-router";

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        {query ? `Results for "${query}"` : "Search"}
      </h1>
      {/* Phase 3: GROQ full-text search with score/boost, render as ArticleCard list */}
      <p className="mt-2 text-sm text-gray-400">
        Search results will appear here.
      </p>
    </div>
  );
}
