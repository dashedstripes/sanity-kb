const MINUTE = 60_000;
const HOUR = 3_600_000;
const DAY = 86_400_000;
const WEEK = 604_800_000;
const MONTH = 2_592_000_000;

/**
 * Formats an ISO date string as a human-readable relative time.
 * e.g., "2 hours ago", "3 days ago", "Jan 15"
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = Date.now();
  const diff = now - date.getTime();

  if (diff < MINUTE) return "just now";
  if (diff < HOUR) {
    const mins = Math.floor(diff / MINUTE);
    return `${mins}m ago`;
  }
  if (diff < DAY) {
    const hours = Math.floor(diff / HOUR);
    return `${hours}h ago`;
  }
  if (diff < WEEK) {
    const days = Math.floor(diff / DAY);
    return days === 1 ? "yesterday" : `${days}d ago`;
  }
  if (diff < MONTH) {
    const weeks = Math.floor(diff / WEEK);
    return `${weeks}w ago`;
  }

  // Older than a month — show date
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
  });
}
