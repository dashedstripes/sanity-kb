import { useQuery } from "@sanity/sdk-react";

/**
 * Thin wrapper around the SDK's useQuery hook.
 * Provides typed GROQ query execution with loading/error states.
 *
 * The SDK handles:
 * - Authentication (via SanityApp provider + Dashboard deployment)
 * - Real-time content updates (live by default)
 * - Caching and deduplication
 */
export function useSanityQuery<T>(
  query: string,
  params?: Record<string, unknown>,
) {
  return useQuery<T>({ query, params });
}
