import { useParams, Link } from "react-router";
import { useEffect } from "react";
import { useSanityQuery } from "@/lib/sanity";
import { ARTICLE_DETAIL_QUERY } from "@/lib/queries";
import {
  Breadcrumbs,
  buildCategoryBreadcrumbs,
  type Crumb,
} from "@/components/Breadcrumbs";
import { ArticleBody } from "@/components/portable-text/ArticleBody";
import { TableOfContents } from "@/components/TableOfContents";
import { formatRelativeTime } from "@/lib/formatRelativeTime";
import { useActiveCategory } from "@/hooks/useActiveCategory";
import type { ArticleDetail } from "@/lib/types";

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { setCategoryId } = useActiveCategory();

  const { data: article, isPending } = useSanityQuery<ArticleDetail>(
    ARTICLE_DETAIL_QUERY,
    { slug },
  );

  // Sync active category to sidebar for wayfinding
  useEffect(() => {
    if (article?.category?._id) {
      setCategoryId(article.category._id);
    }
    return () => setCategoryId(null);
  }, [article?.category?._id, setCategoryId]);

  if (isPending) {
    return <ArticleSkeleton />;
  }

  if (!article) {
    return (
      <div className="py-12 text-center">
        <p className="text-3xl">📄</p>
        <p className="mt-3 text-sm text-gray-500">
          This article doesn't exist or may have been moved.
        </p>
        <Link
          to="/"
          className="mt-3 inline-block text-sm text-blue-600 hover:text-blue-800"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  // Build breadcrumbs: Home → [parent category] → category → article title
  const crumbs: Crumb[] = article.category
    ? [
        ...buildCategoryBreadcrumbs(article.category),
        { label: article.title },
      ]
    : [{ label: "Home", href: "/" }, { label: article.title }];

  // Estimate read time (~200 wpm)
  const wordCount = article.body
    ? JSON.stringify(article.body).split(/\s+/).length
    : 0;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  return (
    <div>
      <Breadcrumbs crumbs={crumbs} />

      {/* Title */}
      <h1 className="text-3xl font-bold leading-tight text-gray-900">
        {article.title}
      </h1>

      {/* Meta line */}
      <p className="mt-2 text-sm text-gray-400">
        Updated {formatRelativeTime(article._updatedAt)}
        {article.publishedAt && (
          <>
            {" · "}
            Published{" "}
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </>
        )}
        {" · "}
        {readTime} min read
      </p>

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {article.tags.map((tag) => (
            <Link
              key={tag}
              to={`/search?q=${encodeURIComponent(tag)}`}
              className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      {/* Table of Contents */}
      {article.body && (
        <div className="mt-6">
          <TableOfContents body={article.body} />
        </div>
      )}

      {/* Article body */}
      {article.body && (
        <div className="mt-2">
          <ArticleBody
            value={article.body}
            internalLinkSlugs={article.internalLinkSlugs}
          />
        </div>
      )}

      {/* Related articles */}
      {article.relatedArticles && article.relatedArticles.length > 0 && (
        <section className="mt-10 border-t border-gray-200 pt-6">
          <h2 className="mb-3 text-sm font-semibold text-gray-500">
            📎 Related Articles
          </h2>
          <ul className="space-y-1">
            {article.relatedArticles.map((related) => (
              <li key={related._id}>
                <Link
                  to={`/article/${related.slug.current}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {related.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function ArticleSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-6 h-3 w-48 rounded bg-gray-200" />
      <div className="h-8 w-3/4 rounded bg-gray-200" />
      <div className="mt-3 h-3 w-48 rounded bg-gray-100" />
      <div className="mt-4 flex gap-2">
        <div className="h-5 w-12 rounded bg-gray-100" />
        <div className="h-5 w-16 rounded bg-gray-100" />
        <div className="h-5 w-10 rounded bg-gray-100" />
      </div>
      <div className="mt-8 space-y-4">
        <div className="h-4 w-full rounded bg-gray-100" />
        <div className="h-4 w-full rounded bg-gray-100" />
        <div className="h-4 w-5/6 rounded bg-gray-100" />
        <div className="mt-6 h-6 w-48 rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-100" />
        <div className="h-4 w-full rounded bg-gray-100" />
        <div className="h-4 w-3/4 rounded bg-gray-100" />
      </div>
    </div>
  );
}
