import { useCallback, useMemo, useState } from "react";
import { useSearchContext } from "../context/SearchContext";
import { useInfinitePhotos } from "../hooks/useInfinitePhotos";
import ImageGrid from "../components/ImageGrid";
import type { Photo } from "../types/unsplash";
import ImageModal from "../components/ImageModal";

export default function History() {
  const { history, clearHistory } = useSearchContext();
  const [active, setActive] = useState<string>(history[0] ?? "");

  const { items, loading, error, hasMore, loadMore } = useInfinitePhotos({
    mode: "search",
    query: active || null,
    perPage: 20,
  });

  const onPick = useCallback((term: string) => setActive(term), []);
  const disabled = useMemo(() => history.length === 0, [history.length]);

  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Photo | null>(null);

  return (
    <section>
      <div className="card" style={{ padding: 12, marginBottom: 12 }}>
        <div className="row" style={{ marginBottom: 8 }}>
          <div className="badge">ძებნის ისტორია</div>
          <button className="xbtn" onClick={clearHistory} disabled={disabled}>
            გასუფთავება
          </button>
        </div>

        {history.length === 0 ? (
          <div className="helper">
            პირველად მთავარზე მოძებნე რამე — აქ გამოჩნდება შენი საკვანძო
            სიტყვები.
          </div>
        ) : (
          <div className="historyList">
            {history.map((h) => (
              <span
                key={h}
                className={`pill historyItem ${h === active ? "active" : ""}`}
                onClick={() => onPick(h)}
                title="დააწკაპუნე შედეგების სანახავად"
              >
                {h}
              </span>
            ))}
          </div>
        )}
      </div>

      {active ? (
        <>
          <div className="badge" style={{ marginBottom: 8 }}>
            არჩეული: “{active}”
          </div>
          <ImageGrid
            items={items}
            loading={loading}
            error={error}
            hasMore={hasMore}
            onLoadMore={loadMore}
            onOpen={(p) => {
              setCurrent(p);
              setOpen(true);
            }}
          />
          <ImageModal
            open={open}
            photo={current}
            onClose={() => setOpen(false)}
          />
        </>
      ) : (
        <div className="helper">აირჩიე საკვანძო სიტყვა ისტორიიდან.</div>
      )}
    </section>
  );
}
