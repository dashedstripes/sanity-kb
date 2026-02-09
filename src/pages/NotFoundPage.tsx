import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-900">Page Not Found</h1>
      <p className="mt-2 text-gray-600">
        This article doesn't exist or may have been moved.
      </p>
      <Link
        to="/"
        className="mt-4 inline-block text-blue-600 hover:text-blue-700"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
