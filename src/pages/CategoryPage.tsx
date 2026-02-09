import { useParams } from "react-router";

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div>
      {/* Phase 2: Breadcrumbs component */}
      <h1 className="text-2xl font-bold text-gray-900">
        Category: {slug}
      </h1>
      {/* Phase 2: Category description, subcategory cards, article list */}
      <p className="mt-2 text-sm text-gray-400">
        Category details and articles will be loaded here.
      </p>
    </div>
  );
}
