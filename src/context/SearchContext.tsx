import React, { createContext, useCallback, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Ctx = {
  history: string[];
  addSearchTerm: (term: string) => void;
  clearHistory: () => void;
};

const SearchContext = createContext<Ctx | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useLocalStorage<string[]>(
    "galleryapp_history_v1",
    []
  );

  const addSearchTerm = useCallback(
    (term: string) => {
      const t = term.trim();
      if (!t) return;
      setHistory((prev) => {
        const without = prev.filter((x) => x.toLowerCase() !== t.toLowerCase());
        return [t, ...without].slice(0, 50);
      });
    },
    [setHistory]
  );

  const clearHistory = useCallback(() => setHistory([]), [setHistory]);

  return (
    <SearchContext.Provider value={{ history, addSearchTerm, clearHistory }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const ctx = useContext(SearchContext);
  if (!ctx)
    throw new Error("useSearchContext must be used within SearchProvider");
  return ctx;
}
