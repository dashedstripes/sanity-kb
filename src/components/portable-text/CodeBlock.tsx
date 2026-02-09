import { useState, useCallback } from "react";
import type { CodeBlockValue } from "@/lib/types";

interface CodeBlockProps {
  value: CodeBlockValue;
}

export function CodeBlock({ value }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(value.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [value.code]);

  const label = value.filename || value.language || "text";

  return (
    <div className="my-4 overflow-hidden rounded-lg bg-gray-900">
      <div className="flex items-center justify-between border-b border-gray-700 px-4 py-2">
        <span className="text-xs text-gray-400">{label}</span>
        <button
          onClick={handleCopy}
          className="rounded border border-gray-600 px-2 py-0.5 text-xs text-gray-400 transition-colors hover:border-gray-400 hover:text-gray-200"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-gray-200">
        <code>{value.code}</code>
      </pre>
    </div>
  );
}
