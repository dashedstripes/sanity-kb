import { useState, useCallback, useMemo, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router";
import type { CategoryTreeNode } from "@/lib/types";
import { MAX_SIDEBAR_DEPTH } from "@/lib/buildCategoryTree";

interface CategoryTreeProps {
  nodes: CategoryTreeNode[];
  activeCategoryId?: string | null;
}

/**
 * Collect all ancestor category IDs for a given slug.
 * Walks the tree to find the node, then returns all ancestor IDs.
 */
function findAncestorIds(
  nodes: CategoryTreeNode[],
  targetSlug: string,
  ancestors: string[] = [],
): string[] | null {
  for (const node of nodes) {
    if (node.slug.current === targetSlug) {
      return ancestors;
    }
    const found = findAncestorIds(node.children, targetSlug, [
      ...ancestors,
      node._id,
    ]);
    if (found) return found;
  }
  return null;
}

/**
 * Find ancestor IDs for a category by its _id.
 * Used when navigating to an article — the article's category ID
 * is passed via context, and we expand the path to it.
 */
function findAncestorIdsById(
  nodes: CategoryTreeNode[],
  targetId: string,
  ancestors: string[] = [],
): string[] | null {
  for (const node of nodes) {
    if (node._id === targetId) {
      return [...ancestors, node._id];
    }
    const found = findAncestorIdsById(node.children, targetId, [
      ...ancestors,
      node._id,
    ]);
    if (found) return found;
  }
  return null;
}

export function CategoryTree({ nodes, activeCategoryId }: CategoryTreeProps) {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const isArticlePage = location.pathname.startsWith("/article/");
  const isCategoryPage = location.pathname.startsWith("/category/");

  // Compute which nodes should be auto-expanded based on current route
  const autoExpandIds = useMemo(() => {
    if (nodes.length === 0) return new Set<string>();

    if (isCategoryPage && slug) {
      const ancestors = findAncestorIds(nodes, slug);
      return new Set(ancestors || []);
    }

    // For article pages, use the active category ID from context
    // to expand the sidebar to show where the article lives
    if (isArticlePage && activeCategoryId) {
      const ancestors = findAncestorIdsById(nodes, activeCategoryId);
      return new Set(ancestors || []);
    }

    return new Set<string>();
  }, [slug, nodes, isCategoryPage, isArticlePage, activeCategoryId]);

  // Track manually toggled nodes
  const [manualExpanded, setManualExpanded] = useState<Set<string>>(
    () => new Set(),
  );
  const [manualCollapsed, setManualCollapsed] = useState<Set<string>>(
    () => new Set(),
  );

  // Reset manual overrides when route changes
  useEffect(() => {
    setManualCollapsed(new Set());
  }, [slug]);

  const isExpanded = useCallback(
    (nodeId: string, depth: number) => {
      // Manual collapse overrides everything
      if (manualCollapsed.has(nodeId)) return false;
      // Manual expand
      if (manualExpanded.has(nodeId)) return true;
      // Auto-expand for active path
      if (autoExpandIds.has(nodeId)) return true;
      // Top-level categories start expanded
      return depth === 0;
    },
    [autoExpandIds, manualExpanded, manualCollapsed],
  );

  const toggleNode = useCallback((nodeId: string, currentlyExpanded: boolean) => {
    if (currentlyExpanded) {
      setManualCollapsed((prev) => new Set(prev).add(nodeId));
      setManualExpanded((prev) => {
        const next = new Set(prev);
        next.delete(nodeId);
        return next;
      });
    } else {
      setManualExpanded((prev) => new Set(prev).add(nodeId));
      setManualCollapsed((prev) => {
        const next = new Set(prev);
        next.delete(nodeId);
        return next;
      });
    }
  }, []);

  if (nodes.length === 0) {
    return (
      <p className="px-2 text-sm text-gray-400">No categories yet</p>
    );
  }

  return (
    <ul className="space-y-0.5">
      {nodes.map((node) => (
        <TreeNode
          key={node._id}
          node={node}
          depth={0}
          activeSlug={slug}
          isArticlePage={isArticlePage}
          isExpanded={isExpanded}
          onToggle={toggleNode}
        />
      ))}
    </ul>
  );
}

interface TreeNodeProps {
  node: CategoryTreeNode;
  depth: number;
  activeSlug?: string;
  isArticlePage: boolean;
  isExpanded: (nodeId: string, depth: number) => boolean;
  onToggle: (nodeId: string, currentlyExpanded: boolean) => void;
}

function TreeNode({
  node,
  depth,
  activeSlug,
  isArticlePage,
  isExpanded,
  onToggle,
}: TreeNodeProps) {
  const isActive = !isArticlePage && activeSlug === node.slug.current;
  const hasChildren = node.children.length > 0;
  const canExpand = hasChildren && depth < MAX_SIDEBAR_DEPTH - 1;
  const expanded = isExpanded(node._id, depth);

  const indent = depth * 16; // 16px per level per UX spec

  return (
    <li>
      <div
        className={`group flex items-center rounded-md px-2 py-1.5 text-sm ${
          isActive
            ? "border-l-2 border-blue-600 bg-blue-50 font-medium text-blue-700"
            : "text-gray-700 hover:bg-gray-100"
        }`}
        style={{ paddingLeft: `${indent + 8}px` }}
      >
        {/* Expand/collapse toggle */}
        {canExpand ? (
          <button
            onClick={() => onToggle(node._id, expanded)}
            className="mr-1 flex h-4 w-4 shrink-0 items-center justify-center text-gray-400 hover:text-gray-600"
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            <svg
              className={`h-3 w-3 transition-transform ${expanded ? "rotate-90" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <span className="mr-1 w-4 shrink-0" />
        )}

        {/* Icon */}
        {node.icon && (
          <span className="mr-1.5 shrink-0 text-sm">{node.icon}</span>
        )}

        {/* Category link */}
        <Link
          to={`/category/${node.slug.current}`}
          className="min-w-0 flex-1 truncate"
        >
          {node.title}
        </Link>

        {/* Article count badge */}
        {node.articleCount > 0 && !expanded && (
          <span className="ml-auto shrink-0 text-xs text-gray-400">
            {node.articleCount}
          </span>
        )}
      </div>

      {/* Children */}
      {expanded && hasChildren && (
        <ul className="space-y-0.5">
          {node.children.map((child) => (
            <TreeNode
              key={child._id}
              node={child}
              depth={depth + 1}
              activeSlug={activeSlug}
              isArticlePage={isArticlePage}
              isExpanded={isExpanded}
              onToggle={onToggle}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
