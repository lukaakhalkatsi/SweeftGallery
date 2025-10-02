import type { Photo } from "../types/unsplash";

type Props = {
  photo: Photo;
  onClick: (photo: Photo) => void;
};

export default function ImageCard({ photo, onClick }: Props) {
  const title = photo.alt_description || photo.description || "Untitled";
  return (
    <div
      className="thumbWrap card"
      role="button"
      onClick={() => onClick(photo)}
      title={`${title} — ${photo.user.name}`}
    >
      <img
        className="thumb"
        src={photo.urls.small}
        alt={title ?? "photo"}
        loading="lazy"
      />
    </div>
  );
}
