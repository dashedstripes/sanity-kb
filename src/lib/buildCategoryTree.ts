import type { Category, CategoryTreeNode } from "./types";

const MAX_SIDEBAR_DEPTH = 3;

/**
 * Converts a flat list of categories (with parent refs) into a nested tree.
 * Caps rendered depth at MAX_SIDEBAR_DEPTH per UX spec.
 * Categories deeper than the cap are attached to their nearest visible ancestor.
 */
export function buildCategoryTree(categories: Category[]): CategoryTreeNode[] {
  const byId = new Map<string, CategoryTreeNode>();

  // Initialize nodes
  for (const cat of categories) {
    byId.set(cat._id, { ...cat, children: [] });
  }

  const roots: CategoryTreeNode[] = [];

  // Build parent-child relationships
  for (const cat of categories) {
    const node = byId.get(cat._id)!;
    if (cat.parent) {
      const parent = byId.get(cat.parent);
      if (parent) {
        parent.children.push(node);
      } else {
        // Orphan — parent doesn't exist, treat as root
        roots.push(node);
      }
    } else {
      roots.push(node);
    }
  }

  // Sort children by order at each level
  function sortChildren(nodes: CategoryTreeNode[]) {
    nodes.sort((a, b) => a.order - b.order);
    for (const node of nodes) {
      sortChildren(node.children);
    }
  }

  sortChildren(roots);
  return roots;
}

/**
 * Returns the depth of a node in the tree (0-indexed).
 * Used to determine if a node should render as expandable or flat.
 */
export function getNodeDepth(
  nodeId: string,
  categories: Category[],
): number {
  const byId = new Map<string, Category>();
  for (const cat of categories) {
    byId.set(cat._id, cat);
  }

  let depth = 0;
  let current = byId.get(nodeId);
  while (current?.parent) {
    depth++;
    current = byId.get(current.parent);
    if (depth > 10) break; // Safety valve for circular refs
  }
  return depth;
}

export { MAX_SIDEBAR_DEPTH };
