import { useState, useCallback } from "react";
import { Link, useParams } from "react-router";
import type { CategoryTreeNode } from "@/lib/types";
import { MAX_SIDEBAR_DEPTH } from "@/lib/buildCategoryTree";

interface CategoryTreeProps {
  nodes: CategoryTreeNode[];
}

export function CategoryTree({ nodes }: CategoryTreeProps) {
  if (nodes.length === 0) {
    return (
      <p className="px-2 text-sm text-gray-400">No categories yet</p>
    );
  }

  return (
    <ul className="space-y-0.5">
      {nodes.map((node) => (
        <TreeNode key={node._id} node={node} depth={0} />
      ))}
    </ul>
  );
}

interface TreeNodeProps {
  node: CategoryTreeNode;
  depth: number;
}

function TreeNode({ node, depth }: TreeNodeProps) {
  const { slug: activeSlug } = useParams<{ slug: string }>();
  const [expanded, setExpanded] = useState(depth === 0); // Top-level expanded by default

  const isActive = activeSlug === node.slug.current;
  const hasChildren = node.children.length > 0;
  const canExpand = hasChildren && depth < MAX_SIDEBAR_DEPTH - 1;

  const toggle = useCallback(() => {
    if (canExpand) setExpanded((prev) => !prev);
  }, [canExpand]);

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
            onClick={toggle}
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
            <TreeNode key={child._id} node={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}
