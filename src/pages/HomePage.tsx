export function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
      <p className="mt-2 text-gray-600">
        Welcome to the knowledge base. Browse categories in the sidebar or
        search for articles above.
      </p>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900">
          Recently Updated
        </h2>
        {/* Phase 2: Fetch last 10 articles from Content Lake, render as ArticleCard list */}
        <p className="mt-2 text-sm text-gray-400">
          Recent articles will appear here once connected to the Content Lake.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900">
          Browse by Category
        </h2>
        {/* Phase 2: Fetch top-level categories, render as CategoryCard grid */}
        <p className="mt-2 text-sm text-gray-400">
          Top-level categories will appear here.
        </p>
      </section>
    </div>
  );
}
