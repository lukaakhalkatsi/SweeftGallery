import { useCallback, useEffect, useRef, useState } from "react";
import { Unsplash } from "../lib/unsplash";
import { get, makeKey, set } from "../lib/cache";
import type { Photo } from "../types/unsplash";

type Options = {
  mode: "popular" | "search";
  query?: string | null;
  perPage?: number;
};

export function useInfinitePhotos({
  mode,
  query = null,
  perPage = 20,
}: Options) {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const latestQuery = useRef(query);
  useEffect(() => {
    latestQuery.current = query;
  }, [query]);

  // Reset when query changes
  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, [mode, query, perPage]);

  const fetchPage = useCallback(
    async (p: number) => {
      const key = makeKey(mode, latestQuery.current ?? null, p, perPage);
      const cached = get<Photo[] | { results: Photo[] }>(key);

      if (cached) {
        const list = Array.isArray(cached) ? cached : cached.results;
        setItems((prev) => [...prev, ...list]);
        setHasMore(list.length === perPage);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        if (mode === "popular") {
          const res = await Unsplash.listPopular(p, perPage);
          set(key, res);
          setItems((prev) => [...prev, ...res]);
          setHasMore(res.length === perPage);
        } else {
          const res = await Unsplash.search(
            latestQuery.current ?? "",
            p,
            perPage
          );
          set(key, res);
          setItems((prev) => [...prev, ...res.results]);
          setHasMore(res.results.length === perPage);
        }
      } catch (e: any) {
        setError(e.message ?? String(e));
      } finally {
        setLoading(false);
      }
    },
    [mode, perPage]
  );

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    const next = page + 1;
    setPage(next);
    fetchPage(next);
  }, [page, loading, hasMore, fetchPage]);

  // initial fetch
  useEffect(() => {
    fetchPage(1);
  }, [mode, query, perPage]);

  return { items, loading, error, hasMore, loadMore };
}
