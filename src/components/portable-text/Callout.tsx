import { PortableText } from "@portabletext/react";
import type { CalloutValue } from "@/lib/types";

interface CalloutProps {
  value: CalloutValue;
}

const toneConfig = {
  tip: {
    icon: "💡",
    label: "Tip",
    border: "border-blue-400",
    bg: "bg-blue-50",
    title: "text-blue-900",
    text: "text-blue-800",
  },
  info: {
    icon: "ℹ️",
    label: "Info",
    border: "border-gray-400",
    bg: "bg-gray-50",
    title: "text-gray-800",
    text: "text-gray-700",
  },
  warning: {
    icon: "⚠️",
    label: "Warning",
    border: "border-amber-400",
    bg: "bg-amber-50",
    title: "text-amber-900",
    text: "text-amber-800",
  },
  danger: {
    icon: "🚨",
    label: "Danger",
    border: "border-red-400",
    bg: "bg-red-50",
    title: "text-red-900",
    text: "text-red-800",
  },
} as const;

export function Callout({ value }: CalloutProps) {
  const config = toneConfig[value.tone] || toneConfig.info;
  const displayTitle = value.title || `${config.icon} ${config.label}`;

  return (
    <div
      className={`my-4 rounded-r-lg border-l-[3px] ${config.border} ${config.bg} p-4`}
    >
      <div className="flex gap-2.5">
        <span className="shrink-0 text-base">{config.icon}</span>
        <div className="min-w-0 flex-1">
          <p className={`text-sm font-semibold ${config.title}`}>
            {displayTitle}
          </p>
          <div className={`mt-1 text-sm leading-relaxed ${config.text}`}>
            <PortableText value={value.body} />
          </div>
        </div>
      </div>
    </div>
  );
}
