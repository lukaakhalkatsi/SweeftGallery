import { useEffect, useRef } from "react";
import type { Photo } from "../types/unsplash";
import ImageCard from "./ImageCard";
import InfiniteAnchor from "./InfiniteAnchor";

type Props = {
  items: Photo[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  onLoadMore: () => void;
  onOpen: (photo: Photo) => void;
};

export default function ImageGrid({
  items,
  loading,
  error,
  hasMore,
  onLoadMore,
  onOpen,
}: Props) {
  const firstMount = useRef(true);

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
      return;
    }
    const links = items.slice(-10).map((p) => p.urls.small);
    links.forEach((href) => {
      const img = new Image();
      img.src = href;
    });
  }, [items]);

  return (
    <>
      {error && <div className="helper">შეცდომა: {error}</div>}

      <div className="grid" aria-live="polite">
        {items.map((p) => (
          <ImageCard key={p.id} photo={p} onClick={onOpen} />
        ))}
        {loading &&
          Array.from({ length: 8 }).map((_, i) => (
            <div key={`sk-${i}`} className="skeleton" />
          ))}
      </div>

      <InfiniteAnchor enabled={hasMore && !loading} onIntersect={onLoadMore} />

      <div className="footerSpace" />
    </>
  );
}
