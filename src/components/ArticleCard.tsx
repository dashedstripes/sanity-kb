import { Link } from "react-router";
import type { ArticleListItem } from "@/lib/types";
import { formatRelativeTime } from "@/lib/formatRelativeTime";

interface ArticleCardProps {
  article: ArticleListItem;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      to={`/article/${article.slug.current}`}
      className="block rounded-lg border border-gray-200 p-4 transition-all hover:border-blue-300 hover:shadow-sm"
    >
      <h3 className="font-medium text-gray-900">{article.title}</h3>

      {article.summary && (
        <p className="mt-1 line-clamp-2 text-sm text-gray-600">
          {article.summary}
        </p>
      )}

      <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
        {article.category && (
          <span>
            {article.category.icon || "📁"} {article.category.title}
          </span>
        )}
        <span>Updated {formatRelativeTime(article._updatedAt)}</span>
      </div>

      {article.tags && article.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
