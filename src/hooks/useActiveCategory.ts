import { createContext, useContext } from "react";

/**
 * Context for communicating the active article's category ID
 * from ArticlePage to the Sidebar's CategoryTree.
 *
 * This enables the wayfinding trio: when navigating to an article
 * (e.g., from search), the sidebar auto-expands to show where
 * the article lives in the hierarchy.
 */
interface ActiveCategoryState {
  categoryId: string | null;
  setCategoryId: (id: string | null) => void;
}

export const ActiveCategoryContext = createContext<ActiveCategoryState>({
  categoryId: null,
  setCategoryId: () => {},
});

export function useActiveCategory() {
  return useContext(ActiveCategoryContext);
}
