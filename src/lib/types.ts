import type { PortableTextBlock } from "@portabletext/react";

// --- Document types (matching schema projections) ---

export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  parent: string | null; // parent._ref projected as string
  icon?: string;
  order: number;
  articleCount: number;
}

export interface CategoryDetail {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  icon?: string;
  parent?: {
    _id: string;
    title: string;
    slug: { current: string };
  } | null;
}

export interface ArticleListItem {
  _id: string;
  title: string;
  slug: { current: string };
  summary?: string;
  category: {
    title: string;
    slug: { current: string };
    icon?: string;
  };
  tags?: string[];
  publishedAt?: string;
  _updatedAt: string;
  _score?: number;
}

export interface ArticleDetail {
  _id: string;
  title: string;
  slug: { current: string };
  summary?: string;
  body: PortableTextBlock[];
  tags?: string[];
  publishedAt?: string;
  lastReviewedAt?: string;
  _updatedAt: string;
  category: {
    _id: string;
    title: string;
    slug: { current: string };
    icon?: string;
    parent?: {
      _id: string;
      title: string;
      slug: { current: string };
    } | null;
  };
  relatedArticles?: ArticleListItem[];
  internalLinkSlugs?: { _id: string; slug: string }[];
}

// --- Custom Portable Text block types ---

export interface CodeBlockValue {
  _type: "codeBlock";
  _key: string;
  code: string;
  language?: string;
  filename?: string;
  highlightLines?: string;
}

export interface CalloutValue {
  _type: "callout";
  _key: string;
  tone: "tip" | "info" | "warning" | "danger";
  title?: string;
  body: PortableTextBlock[];
}

export interface DataTableValue {
  _type: "dataTable";
  _key: string;
  caption?: string;
  headers: string[];
  rows: { _key: string; cells: string[] }[];
}

export interface EmbedValue {
  _type: "embed";
  _key: string;
  url: string;
  caption?: string;
}

// --- Sidebar tree (derived) ---

export interface CategoryTreeNode extends Category {
  children: CategoryTreeNode[];
  articles?: ArticleListItem[];
}
