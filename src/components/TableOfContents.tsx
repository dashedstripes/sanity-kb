import type { PortableTextBlock } from "@portabletext/react";

interface TocItem {
  text: string;
  level: "h2" | "h3";
  id: string;
}

interface TableOfContentsProps {
  body: PortableTextBlock[];
}

/**
 * Extract headings from Portable Text blocks for TOC generation.
 * Only shows TOC when there are ≥ 3 headings (per UX spec).
 */
export function extractHeadings(body: PortableTextBlock[]): TocItem[] {
  const headings: TocItem[] = [];

  for (const block of body) {
    if (
      block._type === "block" &&
      (block.style === "h2" || block.style === "h3")
    ) {
      const text = (block.children as { text: string }[])
        ?.map((child) => child.text)
        .join("") || "";

      if (text) {
        headings.push({
          text,
          level: block.style as "h2" | "h3",
          id: slugify(text),
        });
      }
    }
  }

  return headings;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function TableOfContents({ body }: TableOfContentsProps) {
  const headings = extractHeadings(body);

  // Per UX spec: only show TOC when ≥ 3 headings
  if (headings.length < 3) return null;

  return (
    <nav className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
        On this page
      </p>
      <ul className="space-y-1">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`block text-sm text-gray-600 transition-colors hover:text-blue-600 ${
                heading.level === "h3" ? "pl-4" : ""
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
