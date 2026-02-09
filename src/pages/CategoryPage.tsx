import { useParams } from "react-router";
import { useSanityQuery } from "@/lib/sanity";
import {
  CATEGORY_DETAIL_QUERY,
  CATEGORY_ARTICLES_QUERY,
  SUBCATEGORIES_QUERY,
} from "@/lib/queries";
import {
  Breadcrumbs,
  buildCategoryBreadcrumbs,
} from "@/components/Breadcrumbs";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryCard } from "@/components/CategoryCard";
import type { CategoryDetail, ArticleListItem, Category } from "@/lib/types";

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: category, isPending: loadingCategory } =
    useSanityQuery<CategoryDetail>(CATEGORY_DETAIL_QUERY, { slug });

  const { data: articles, isPending: loadingArticles } =
    useSanityQuery<ArticleListItem[]>(CATEGORY_ARTICLES_QUERY, {
      categoryId: category?._id,
    });

  const { data: subcategories } = useSanityQuery<Category[]>(
    SUBCATEGORIES_QUERY,
    { parentId: category?._id },
  );

  if (loadingCategory) {
    return <CategorySkeleton />;
  }

  if (!category) {
    return (
      <div className="py-12 text-center">
        <p className="text-3xl">📭</p>
        <p className="mt-3 text-sm text-gray-500">Category not found.</p>
      </div>
    );
  }

  const breadcrumbs = buildCategoryBreadcrumbs(category);

  return (
    <div>
      <Breadcrumbs crumbs={breadcrumbs} />

      <h1 className="text-2xl font-bold text-gray-900">
        {category.icon} {category.title}
      </h1>
      {category.description && (
        <p className="mt-2 text-base leading-relaxed text-gray-600">
          {category.description}
        </p>
      )}

      {/* Subcategories */}
      {subcategories && subcategories.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Subcategories
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {subcategories.map((sub) => (
              <CategoryCard key={sub._id} category={sub} />
            ))}
          </div>
        </section>
      )}

      {/* Articles */}
      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
          📄 Articles in {category.title}
        </h2>
        {loadingArticles ? (
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border border-gray-200 p-4">
                <div className="h-4 w-3/4 rounded bg-gray-200" />
                <div className="mt-2 h-3 w-full rounded bg-gray-100" />
              </div>
            ))}
          </div>
        ) : articles && articles.length > 0 ? (
          <div className="space-y-2">
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-3xl">📭</p>
            <p className="mt-2 text-sm text-gray-400">
              No articles yet in this category.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function CategorySkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-6 h-3 w-48 rounded bg-gray-200" />
      <div className="h-7 w-64 rounded bg-gray-200" />
      <div className="mt-3 h-4 w-full rounded bg-gray-100" />
      <div className="mt-8 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border border-gray-200 p-4">
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="mt-2 h-3 w-full rounded bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
