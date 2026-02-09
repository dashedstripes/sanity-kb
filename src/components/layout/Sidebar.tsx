import { Link, useNavigate } from "react-router";
import { useSanityQuery } from "@/lib/sanity";
import { CATEGORIES_TREE_QUERY } from "@/lib/queries";
import { buildCategoryTree } from "@/lib/buildCategoryTree";
import { CategoryTree } from "@/components/sidebar/CategoryTree";
import type { Category } from "@/lib/types";

export function Sidebar() {
  const navigate = useNavigate();
  const { data: categories, isPending } = useSanityQuery<Category[]>(
    CATEGORIES_TREE_QUERY,
  );

  const tree = categories ? buildCategoryTree(categories) : [];

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-gray-200 bg-gray-50">
      {/* App identity */}
      <div className="border-b border-gray-200 px-4 py-3">
        <Link
          to="/"
          className="mb-2.5 block text-base font-bold text-gray-900 hover:text-blue-600"
        >
          📖 Knowledge Base
        </Link>

        {/* Search trigger */}
        <button
          onClick={() => navigate("/search")}
          className="flex w-full items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-400 transition-colors hover:border-blue-400"
        >
          <span>🔍</span>
          <span>Search…</span>
          <kbd className="ml-auto rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-xs">
            /
          </kbd>
        </button>
      </div>

      {/* Category tree */}
      <nav className="flex-1 overflow-y-auto p-2">
        {isPending ? (
          <SidebarSkeleton />
        ) : (
          <CategoryTree nodes={tree} />
        )}
      </nav>
    </aside>
  );
}

function SidebarSkeleton() {
  return (
    <div className="animate-pulse space-y-2 p-2">
      {[120, 80, 100, 60, 90, 110, 70, 85].map((width, i) => (
        <div
          key={i}
          className="h-5 rounded bg-gray-200"
          style={{ width: `${width}px` }}
        />
      ))}
    </div>
  );
}
