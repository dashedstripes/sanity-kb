import type { EmbedValue } from "@/lib/types";

interface EmbedProps {
  value: EmbedValue;
}

function getEmbedUrl(url: string): { type: string; embedUrl: string } | null {
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/,
  );
  if (ytMatch) {
    return {
      type: "YouTube",
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`,
    };
  }

  // Loom
  const loomMatch = url.match(/loom\.com\/share\/([\w-]+)/);
  if (loomMatch) {
    return {
      type: "Loom",
      embedUrl: `https://www.loom.com/embed/${loomMatch[1]}`,
    };
  }

  // Figma
  if (url.includes("figma.com")) {
    return {
      type: "Figma",
      embedUrl: `https://www.figma.com/embed?embed_host=kb&url=${encodeURIComponent(url)}`,
    };
  }

  // CodeSandbox
  const csbMatch = url.match(/codesandbox\.io\/s\/([\w-]+)/);
  if (csbMatch) {
    return {
      type: "CodeSandbox",
      embedUrl: `https://codesandbox.io/embed/${csbMatch[1]}`,
    };
  }

  return null;
}

export function Embed({ value }: EmbedProps) {
  const embed = getEmbedUrl(value.url);

  if (embed) {
    return (
      <div className="my-6">
        <div className="aspect-video overflow-hidden rounded-lg shadow-sm">
          <iframe
            src={embed.embedUrl}
            className="h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={value.caption || `${embed.type} embed`}
          />
        </div>
        {value.caption && (
          <p className="mt-2 text-center text-sm text-gray-500">
            {value.caption}
          </p>
        )}
      </div>
    );
  }

  // Fallback: link card for unrecognized URLs
  return (
    <div className="my-4">
      <a
        href={value.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-lg border border-gray-200 p-4 text-sm text-blue-600 transition-colors hover:border-blue-300 hover:bg-blue-50"
      >
        <span className="text-lg">🔗</span>
        <span className="min-w-0 truncate">{value.url}</span>
        <span className="ml-auto shrink-0 text-gray-400">↗</span>
      </a>
      {value.caption && (
        <p className="mt-1 text-center text-sm text-gray-500">
          {value.caption}
        </p>
      )}
    </div>
  );
}
