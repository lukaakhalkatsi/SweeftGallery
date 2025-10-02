import { useCallback, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import { useInfinitePhotos } from "../hooks/useInfinitePhotos";
import ImageGrid from "../components/ImageGrid";
import ImageModal from "../components/ImageModal";
import type { Photo } from "../types/unsplash";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const mode = useMemo<"popular" | "search">(
    () => (query.trim().length > 0 ? "search" : "popular"),
    [query]
  );

  const { items, loading, error, hasMore, loadMore } = useInfinitePhotos({
    mode,
    query: query.trim() || null,
    perPage: 20, // 20 most popular on main page
  });

  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Photo | null>(null);

  const onOpen = useCallback((p: Photo) => {
    setCurrent(p);
    setOpen(true);
  }, []);

  return (
    <section>
      <div className="card" style={{ padding: 12, marginBottom: 12 }}>
        <SearchBar
          onChange={setQuery}
          placeholder="ძებნა (ყვავილები, მანქანები...)"
        />
        <div className="badge" style={{ marginTop: 8 }}>
          {mode === "popular" ? "პოპულარული სურათები" : `ძებნა: “${query}”`}
        </div>
      </div>

      <ImageGrid
        items={items}
        loading={loading}
        error={error}
        hasMore={hasMore}
        onLoadMore={loadMore}
        onOpen={onOpen}
      />

      <ImageModal open={open} photo={current} onClose={() => setOpen(false)} />
    </section>
  );
}
