import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";
import { Link } from "react-router";
import { CodeBlock } from "./CodeBlock";
import { Callout } from "./Callout";
import { DataTable } from "./DataTable";
import { Embed } from "./Embed";
import type {
  CodeBlockValue,
  CalloutValue,
  DataTableValue,
  EmbedValue,
} from "@/lib/types";

interface ArticleBodyProps {
  value: PortableTextBlock[];
}

const components: PortableTextComponents = {
  types: {
    codeBlock: ({ value }: { value: CodeBlockValue }) => (
      <CodeBlock value={value} />
    ),
    callout: ({ value }: { value: CalloutValue }) => (
      <Callout value={value} />
    ),
    dataTable: ({ value }: { value: DataTableValue }) => (
      <DataTable value={value} />
    ),
    embed: ({ value }: { value: EmbedValue }) => <Embed value={value} />,
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      // TODO: Use Sanity image URL builder for proper CDN URLs
      return (
        <figure className="my-6">
          <img
            src={`https://cdn.sanity.io/images/PLACEHOLDER/${value.asset._ref
              .replace("image-", "")
              .replace("-jpg", ".jpg")
              .replace("-png", ".png")
              .replace("-webp", ".webp")}`}
            alt={value.alt || ""}
            className="w-full rounded-lg"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-blue-600 underline underline-offset-2 hover:text-blue-800"
      >
        {children}
      </a>
    ),
    internalLink: ({ children, value }) => {
      // value.reference._ref is the article document ID
      // In a real implementation, we'd resolve this to a slug via GROQ
      // For now, link using the ref as a fallback
      const slug = value?.slug || value?.reference?._ref;
      if (!slug) return <>{children}</>;
      return (
        <Link
          to={`/article/${slug}`}
          className="text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-800 hover:decoration-blue-600"
          title="Internal article link"
        >
          {children}
          <span className="ml-0.5 text-xs text-blue-400">↗</span>
        </Link>
      );
    },
    code: ({ children }) => (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800">
        {children}
      </code>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-8 mb-3 border-t border-gray-100 pt-4 text-2xl font-semibold text-gray-900 first:mt-0 first:border-t-0 first:pt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-2 text-xl font-semibold text-gray-900">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-4 mb-2 text-base font-semibold text-gray-900">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-3 border-gray-300 pl-4 italic text-gray-600">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-base leading-7 text-gray-700">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 ml-5 list-disc space-y-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 ml-5 list-decimal space-y-1">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-base leading-7 text-gray-700">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-base leading-7 text-gray-700">{children}</li>
    ),
  },
};

export function ArticleBody({ value }: ArticleBodyProps) {
  return <PortableText value={value} components={components} />;
}
