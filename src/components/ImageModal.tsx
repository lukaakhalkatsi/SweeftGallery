import { useEffect, useState } from "react";
import { Unsplash } from "../lib/unsplash";
import type { Photo } from "../types/unsplash";

type Props = {
  open: boolean;
  photo: Photo | null;
  onClose: () => void;
};

export default function ImageModal({ open, photo, onClose }: Props) {
  const [stats, setStats] = useState<{
    views?: number;
    downloads?: number;
    likes?: number;
  }>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function run() {
      if (!photo) return;
      setError(null);

      try {
        const s = await Unsplash.getPhotoStats(photo.id);
        if (!active) return;
        const merged = {
          views: s.views?.total,
          downloads: s.downloads?.total,
          likes: photo.likes,
        };
        setStats(merged);
      } catch (e: any) {
        setStats({
          views: photo.views,
          downloads: photo.downloads,
          likes: photo.likes,
        });
        if (e?.message?.includes("403")) {
          setError(null);
        } else {
          setError(e?.message || String(e));
        }
      }
    }
    run();
    return () => {
      active = false;
    };
  }, [photo]);

  if (!open || !photo) return null;

  const title = photo.alt_description || photo.description || "Photo";

  const onDownload = async () => {
    try {
      await Unsplash.triggerDownload(photo.links.download_location);

      window.open(photo.links.download, "_blank");
    } catch {}
  };

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modalHead">
          <div>
            <div style={{ fontWeight: 600 }}>{title}</div>
            <div className="badge">
              by {photo.user.name} (@{photo.user.username})
            </div>
          </div>
          <button className="xbtn" onClick={onClose}>
            დახურვა
          </button>
        </div>
        <div className="modalContent">
          <img className="modalImg" src={photo.urls.full} alt={title} />
          <div className="modalSide">
            <div className="row">
              <span className="pill">
                მოწონებები 👍 {stats.likes ?? photo.likes ?? "—"}
              </span>
              <span className="pill">
                ნახვები 👁️{" "}
                {typeof stats.views === "number"
                  ? stats.views.toLocaleString()
                  : "—"}
              </span>
              <span className="pill">
                გადმოწერები ⬇️{" "}
                {typeof stats.downloads === "number"
                  ? stats.downloads.toLocaleString()
                  : "—"}
              </span>
            </div>
            {error && (
              <div className="helper">ვერ ჩამოვტვირთე სტატისტიკა: {error}</div>
            )}
            <button className="xbtn" onClick={onDownload}>
              გადმოწერა
            </button>
            <a
              className="xbtn"
              href={photo.links.html}
              target="_blank"
              rel="noreferrer"
            >
              იხილე Unsplash-ზე
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
