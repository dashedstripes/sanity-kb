import { defineQuery } from "groq";

/**
 * Fetch all categories with article counts for the sidebar tree.
 * Returns flat list — tree structure is built client-side.
 */
export const CATEGORIES_TREE_QUERY = defineQuery(`
  *[_type == "category"] | order(order asc) {
    _id, title, slug, icon, description, order,
    "parent": parent._ref,
    "articleCount": count(*[_type == "article" && category._ref == ^._id])
  }
`);

/**
 * Fetch a single category with its parent (for breadcrumbs).
 */
export const CATEGORY_DETAIL_QUERY = defineQuery(`
  *[_type == "category" && slug.current == $slug][0] {
    _id, title, slug, description, icon,
    parent->{ _id, title, slug }
  }
`);

/**
 * Fetch articles in a category, sorted by last updated.
 */
export const CATEGORY_ARTICLES_QUERY = defineQuery(`
  *[_type == "article" && category._ref == $categoryId] | order(_updatedAt desc) {
    _id, title, slug, summary, tags, publishedAt, _updatedAt,
    category->{ title, slug, icon }
  }
`);

/**
 * Fetch subcategories of a given category.
 */
export const SUBCATEGORIES_QUERY = defineQuery(`
  *[_type == "category" && parent._ref == $parentId] | order(order asc) {
    _id, title, slug, icon, description, order,
    "articleCount": count(*[_type == "article" && category._ref == ^._id])
  }
`);

/**
 * Fetch recently updated articles (homepage).
 */
export const RECENT_ARTICLES_QUERY = defineQuery(`
  *[_type == "article"] | order(_updatedAt desc) [0...10] {
    _id, title, slug, summary, tags, publishedAt, _updatedAt,
    category->{ title, slug, icon }
  }
`);

/**
 * Fetch top-level categories (homepage grid).
 */
export const TOP_LEVEL_CATEGORIES_QUERY = defineQuery(`
  *[_type == "category" && !defined(parent)] | order(order asc) {
    _id, title, slug, icon, description, order,
    "articleCount": count(*[_type == "article" && category._ref == ^._id])
  }
`);

/**
 * Fetch a single article with full content, category breadcrumb chain,
 * and related articles.
 */
export const ARTICLE_DETAIL_QUERY = defineQuery(`
  *[_type == "article" && slug.current == $slug][0] {
    _id, title, slug, summary, body, tags,
    publishedAt, lastReviewedAt, _updatedAt,
    category->{
      _id, title, slug, icon,
      parent->{ _id, title, slug }
    },
    relatedArticles[]->{
      _id, title, slug, summary,
      category->{ title, slug, icon }
    }
  }
`);

/**
 * Full-text search with relevance scoring.
 * Boost: title (3x) > summary (2x) > body (1x).
 */
export const SEARCH_QUERY = defineQuery(`
  *[_type == "article" && (
    title match $query ||
    summary match $query ||
    pt::text(body) match $query
  )] | score(
    boost(title match $query, 3),
    boost(summary match $query, 2),
    pt::text(body) match $query
  ) | order(_score desc) [0...20] {
    _id, title, slug, summary,
    category->{ title, slug, icon },
    tags, publishedAt, _updatedAt, _score
  }
`);
