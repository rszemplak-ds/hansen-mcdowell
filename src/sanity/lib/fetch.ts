import "server-only";

import type { QueryParams } from "next-sanity";
import { sanityClient, projectId } from "./client";

const DEFAULT_REVALIDATE = 60;

export class SanityConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SanityConfigError";
  }
}

type SanityFetchOptions = {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
};

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = DEFAULT_REVALIDATE,
}: SanityFetchOptions): Promise<T> {
  if (!projectId || !sanityClient) {
    throw new SanityConfigError(
      "Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Add it to .env.local to fetch content from Sanity.",
    );
  }

  return sanityClient.fetch<T>(query, params, {
    next: { revalidate },
  });
}
