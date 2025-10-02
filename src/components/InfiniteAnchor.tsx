import { useEffect, useRef } from "react";

type Props = {
  enabled: boolean;
  onIntersect: () => void;
  rootMargin?: string;
  threshold?: number;
};

export default function InfiniteAnchor({
  enabled,
  onIntersect,
  rootMargin = "800px",
  threshold = 0,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    const el = ref.current;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) onIntersect();
        });
      },
      { root: null, rootMargin, threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [enabled, onIntersect, rootMargin, threshold]);

  return <div ref={ref} aria-hidden="true" />;
}
