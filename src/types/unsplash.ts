export type Photo = {
  id: string;
  alt_description: string | null;
  description: string | null;
  width: number;
  height: number;
  likes: number;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3?: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  user: {
    name: string;
    username: string;
  };

  views?: number;
  downloads?: number;
};

export type SearchResponse = {
  total: number;
  total_pages: number;
  results: Photo[];
};

export type PhotoStats = {
  views: { total: number };
  downloads: { total: number };
  likes?: { total: number };
};
