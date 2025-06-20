"use client";

import { createContext, useReducer, useCallback } from "react";
import { SearchFilters } from "../type/product-search";
import { useProductCategories } from "../hooks/use-product-categories";
import { shallowEqual } from "@/features/shared/utils/object";

type SearchOptionAction =
  | { type: "SET_FILTERS"; payload: Partial<SearchFilters> }
  | { type: "RESET_FILTERS" };

// 초기 상태
export const DEFAULT_SEARCH_FILTERS: SearchFilters = {
  useFilter: true,
  name: "",
  priceRange: [0, 10_000_000],
  inStock: true,
  category: [],
};

export const getIsActiveSearchOption = (searchOptions: SearchFilters) => {
  const { useFilter, ...options } = searchOptions;

  if (!useFilter) return false;

  return !shallowEqual(options, DEFAULT_SEARCH_FILTERS);
};

function searchOptionReducer(
  state: SearchFilters,
  action: SearchOptionAction
): SearchFilters {
  switch (action.type) {
    case "SET_FILTERS":
      return {
        ...state,
        ...action.payload,
      };
    case "RESET_FILTERS":
      return {
        ...DEFAULT_SEARCH_FILTERS,
      };
    default:
      return state;
  }
}

interface SearchOptionContextType {
  filters: SearchFilters;
  updateFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;
  categories: string[];
}

export const SearchOptionContext = createContext<
  SearchOptionContextType | undefined
>(undefined);

export function SearchOptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: categories } = useProductCategories();

  const [filters, dispatch] = useReducer(
    searchOptionReducer,
    DEFAULT_SEARCH_FILTERS
  );

  const updateFilters = useCallback((filters: Partial<SearchFilters>) => {
    dispatch({ type: "SET_FILTERS", payload: filters });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: "RESET_FILTERS" });
  }, []);

  const contextValue: SearchOptionContextType = {
    filters,
    updateFilters,
    resetFilters,
    categories: categories || [],
  };

  return (
    <SearchOptionContext.Provider value={contextValue}>
      {children}
    </SearchOptionContext.Provider>
  );
}
