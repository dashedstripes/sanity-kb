import { useEffect } from "react";
import { useNavigate } from "react-router";

/**
 * Global keyboard shortcuts for search:
 * - `/` focuses search (when not in an input)
 * - `⌘K` / `Ctrl+K` focuses search (always)
 */
export function useSearchShortcut() {
  const navigate = useNavigate();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const isInput = target.matches("input, textarea, [contenteditable]");

      // ⌘K or Ctrl+K — always works
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        navigate("/search");
        return;
      }

      // / — only when not in an input
      if (e.key === "/" && !isInput) {
        e.preventDefault();
        navigate("/search");
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);
}
