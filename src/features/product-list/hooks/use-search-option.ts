import { useContext } from "react";
import { SearchOptionContext } from "../context/search-option-context";

export function useSearchOption() {
  const context = useContext(SearchOptionContext);
  if (context === undefined) {
    throw new Error(
      "useSearchOption must be used within a SearchOptionProvider"
    );
  }
  return context;
}
