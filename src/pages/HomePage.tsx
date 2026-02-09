import { useNavigate } from "react-router";
import { useState, type FormEvent } from "react";
import { useSanityQuery } from "@/lib/sanity";
import {
  RECENT_ARTICLES_QUERY,
  TOP_LEVEL_CATEGORIES_QUERY,
} from "@/lib/queries";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryCard } from "@/components/CategoryCard";
import type { ArticleListItem, Category } from "@/lib/types";

export function HomePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const { data: recentArticles, isPending: loadingArticles } =
    useSanityQuery<ArticleListItem[]>(RECENT_ARTICLES_QUERY);

  const { data: topCategories, isPending: loadingCategories } =
    useSanityQuery<Category[]>(TOP_LEVEL_CATEGORIES_QUERY);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  }

  return (
    <div>
      {/* Hero search */}
      <form onSubmit={handleSearch} className="mb-10">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the knowledge base…"
          className="w-full rounded-xl border-2 border-gray-200 px-5 py-3.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10"
        />
      </form>

      {/* Recently updated */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
          📝 Recently Updated
        </h2>
        {loadingArticles ? (
          <ArticleListSkeleton />
        ) : recentArticles && recentArticles.length > 0 ? (
          <div className="space-y-2">
            {recentArticles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        ) : (
          <EmptyKB />
        )}
      </section>

      {/* Browse by category */}
      <section className="mt-10">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
          📂 Browse by Category
        </h2>
        {loadingCategories ? (
          <CategoryGridSkeleton />
        ) : topCategories && topCategories.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {topCategories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}

function ArticleListSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="rounded-lg border border-gray-200 p-4">
          <div className="h-4 w-3/4 rounded bg-gray-200" />
          <div className="mt-2 h-3 w-full rounded bg-gray-100" />
          <div className="mt-1 h-3 w-2/3 rounded bg-gray-100" />
          <div className="mt-3 h-3 w-1/3 rounded bg-gray-100" />
        </div>
      ))}
    </div>
  );
}

function CategoryGridSkeleton() {
  return (
    <div className="grid animate-pulse grid-cols-2 gap-3 sm:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-xl border border-gray-200 p-4">
          <div className="mb-2 h-6 w-6 rounded bg-gray-200" />
          <div className="h-4 w-2/3 rounded bg-gray-200" />
          <div className="mt-1 h-3 w-1/3 rounded bg-gray-100" />
          <div className="mt-2 h-3 w-full rounded bg-gray-100" />
        </div>
      ))}
    </div>
  );
}

function EmptyKB() {
  return (
    <div className="py-12 text-center">
      <p className="text-3xl">📭</p>
      <p className="mt-3 text-sm text-gray-500">
        This knowledge base is empty.
      </p>
      <p className="mt-1 text-sm text-gray-400">
        Articles created in Sanity Studio will appear here automatically.
      </p>
    </div>
  );
}
