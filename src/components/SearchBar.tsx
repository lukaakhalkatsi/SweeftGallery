import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useSearchContext } from "../context/SearchContext";

type Props = {
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  onChange,
  placeholder = "ძებნა...",
}: Props) {
  const [value, setValue] = useState("");
  const debounced = useDebounce(value, 500);
  const { addSearchTerm } = useSearchContext();

  useEffect(() => {
    onChange(debounced);
    if (debounced.trim().length > 0) {
      addSearchTerm(debounced);
    }
  }, [debounced]);

  return (
    <div className="searchRow">
      <input
        className="searchInput"
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        autoComplete="off"
      />
      {value && <span className="badge">Live</span>}
    </div>
  );
}
