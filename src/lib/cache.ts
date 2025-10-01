type CacheKey = string;
type CacheValue = unknown;

const mem = new Map<CacheKey, CacheValue>();
const SS_KEY = "galleryapp_cache_v1";

function loadSession() {
  try {
    const raw = sessionStorage.getItem(SS_KEY);
    if (raw) {
      const obj = JSON.parse(raw);
      for (const [k, v] of Object.entries(obj)) mem.set(k, v);
    }
  } catch {}
}

function saveSession() {
  try {
    const obj: Record<string, unknown> = {};
    for (const [k, v] of mem.entries()) obj[k] = v;
    sessionStorage.setItem(SS_KEY, JSON.stringify(obj));
  } catch {}
}

loadSession();

export function makeKey(
  kind: "popular" | "search",
  query: string | null,
  page: number,
  perPage: number
) {
  return `${kind}:${query ?? ""}:${page}:${perPage}`;
}

export function get<T = unknown>(key: string): T | undefined {
  return mem.get(key) as T | undefined;
}

export function set(key: string, value: CacheValue) {
  mem.set(key, value);
  saveSession();
}

export function clearAll() {
  mem.clear();
  saveSession();
}
