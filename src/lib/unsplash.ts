import type { Photo, SearchResponse, PhotoStats } from "../types/unsplash";

const BASE = "https://api.unsplash.com";
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY as string;

if (!ACCESS_KEY) {
  console.error("Missing VITE_UNSPLASH_ACCESS_KEY in .env");
}

async function request<T>(
  path: string,
  params: Record<string, string | number> = {}
) {
  const url = new URL(BASE + path);
  Object.entries(params).forEach(([k, v]) =>
    url.searchParams.set(k, String(v))
  );

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Unsplash error ${res.status}: ${body}`);
  }

  return res.json() as Promise<T>;
}

export const Unsplash = {
  // 20 most popular (per requirement)
  listPopular: (page: number, perPage: number) =>
    request<Photo[]>("/photos", {
      page,
      per_page: perPage,
      order_by: "popular",
    }),

  search: (query: string, page: number, perPage: number) =>
    request<SearchResponse>("/search/photos", {
      query,
      page,
      per_page: perPage,
    }),

  getPhoto: (id: string) => request<Photo>(`/photos/${id}`),

  getPhotoStats: (id: string) =>
    request<PhotoStats>(`/photos/${id}/statistics`),

  triggerDownload: (downloadLocation: string) =>
    fetch(downloadLocation, {
      headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
    }).then(() => {}),
};
