import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <div className="py-16 text-center">
      <p className="text-4xl">🔍</p>
      <h1 className="mt-4 text-xl font-bold text-gray-900">Page Not Found</h1>
      <p className="mt-2 text-sm text-gray-500">
        This page doesn't exist or may have been moved.
      </p>
      <div className="mt-6 inline-block text-left">
        <p className="text-sm font-medium text-gray-600">Try instead:</p>
        <ul className="mt-2 space-y-1 text-sm text-gray-500">
          <li>
            <Link to="/" className="text-blue-600 hover:underline">
              ← Browse the homepage
            </Link>
          </li>
          <li>
            <Link to="/search" className="text-blue-600 hover:underline">
              🔍 Search for articles
            </Link>
          </li>
          <li>
            <span className="text-gray-400">
              Or browse categories in the sidebar
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
