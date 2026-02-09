import { Link } from "react-router";

export interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
}

export function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  if (crumbs.length <= 1) return null;

  return (
    <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-gray-400">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;

        return (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <span className="text-gray-300">›</span>}
            {isLast || !crumb.href ? (
              <span className="text-gray-600">{crumb.label}</span>
            ) : (
              <Link
                to={crumb.href}
                className="text-gray-500 transition-colors hover:text-blue-600"
              >
                {crumb.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

/**
 * Build breadcrumb chain from a category with optional parent.
 */
export function buildCategoryBreadcrumbs(
  category: {
    title: string;
    slug: { current: string };
    icon?: string;
    parent?: {
      title: string;
      slug: { current: string };
    } | null;
  },
): Crumb[] {
  const crumbs: Crumb[] = [{ label: "Home", href: "/" }];

  if (category.parent) {
    crumbs.push({
      label: category.parent.title,
      href: `/category/${category.parent.slug.current}`,
    });
  }

  crumbs.push({
    label: `${category.icon || ""} ${category.title}`.trim(),
    href: `/category/${category.slug.current}`,
  });

  return crumbs;
}
