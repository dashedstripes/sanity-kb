import { Link } from "react-router";
import type { Category } from "@/lib/types";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to={`/category/${category.slug.current}`}
      className="block rounded-xl border border-gray-200 p-4 transition-colors hover:border-blue-300 hover:shadow-sm"
    >
      {category.icon && (
        <span className="mb-2 block text-2xl">{category.icon}</span>
      )}
      <h3 className="text-sm font-semibold text-gray-900">
        {category.title}
      </h3>
      <p className="mt-0.5 text-xs text-gray-400">
        {category.articleCount} article{category.articleCount !== 1 ? "s" : ""}
      </p>
      {category.description && (
        <p className="mt-1.5 line-clamp-2 text-xs text-gray-600">
          {category.description}
        </p>
      )}
    </Link>
  );
}
