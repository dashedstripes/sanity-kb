import { Link } from "react-router";

export function Sidebar() {
  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-gray-200 bg-gray-50">
      <div className="flex h-14 items-center border-b border-gray-200 px-4">
        <Link to="/" className="text-base font-semibold text-gray-900">
          📚 Knowledge Base
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        {/* Phase 2: CategoryTree component — recursive, collapsible, 3-level max */}
        <p className="px-2 text-sm text-gray-400">
          Categories will appear here
        </p>
      </nav>
    </aside>
  );
}
