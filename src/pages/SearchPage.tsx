import { useSearchParams, useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import { useSanityQuery } from "@/lib/sanity";
import { SEARCH_QUERY } from "@/lib/queries";
import { ArticleCard } from "@/components/ArticleCard";
import type { ArticleListItem } from "@/lib/types";

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get("q") ?? "";
  const [inputValue, setInputValue] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus search input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Debounce input → query (300ms per UX spec)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(inputValue);
      // Update URL without navigation
      if (inputValue) {
        navigate(`/search?q=${encodeURIComponent(inputValue)}`, {
          replace: true,
        });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue, navigate]);

  // Only query when we have a search term
  const { data: results, isPending } = useSanityQuery<ArticleListItem[]>(
    debouncedQuery ? SEARCH_QUERY : "",
    debouncedQuery ? { query: `${debouncedQuery}*` } : undefined,
  );

  return (
    <div>
      {/* Search input */}
      <div className="mb-5">
        <input
          ref={inputRef}
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") navigate("/");
          }}
          placeholder="Search the knowledge base…"
          className="w-full rounded-lg border-2 border-blue-500 px-4 py-3 text-base text-gray-900 shadow-sm shadow-blue-500/10 focus:outline-none"
        />
      </div>

      {/* Results */}
      {isPending && debouncedQuery && (
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border border-gray-200 p-4">
              <div className="h-4 w-3/4 rounded bg-gray-200" />
              <div className="mt-2 h-3 w-full rounded bg-gray-100" />
              <div className="mt-1 h-3 w-2/3 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      )}

      {!isPending && debouncedQuery && results && results.length > 0 && (
        <>
          <p className="mb-4 text-sm text-gray-500">
            {results.length} result{results.length !== 1 ? "s" : ""} for "
            {debouncedQuery}"
          </p>
          <div className="space-y-2">
            {results.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        </>
      )}

      {!isPending && debouncedQuery && results && results.length === 0 && (
        <NoResults query={debouncedQuery} />
      )}

      {!debouncedQuery && (
        <p className="py-8 text-center text-sm text-gray-400">
          Start typing to search articles, categories, and tags.
        </p>
      )}
    </div>
  );
}

function NoResults({ query }: { query: string }) {
  return (
    <div className="py-12 text-center">
      <p className="text-3xl">🔍</p>
      <p className="mt-3 text-sm text-gray-500">
        No results for "{query}"
      </p>
      <div className="mt-4 inline-block text-left">
        <p className="text-sm text-gray-500">💡 Suggestions:</p>
        <ul className="mt-1 list-inside list-disc text-sm text-gray-400">
          <li>Check your spelling</li>
          <li>Try fewer or different keywords</li>
          <li>Browse categories in the sidebar</li>
        </ul>
      </div>
    </div>
  );
}
