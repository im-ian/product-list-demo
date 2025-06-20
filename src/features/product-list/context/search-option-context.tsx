"use client";

import { createContext, useReducer, useCallback } from "react";
import { SearchFilters } from "../type/product-search";
import { useProductCategories } from "../hooks/use-product-categories";

type SearchOptionAction =
  | { type: "SET_FILTERS"; payload: Partial<SearchFilters> }
  | { type: "RESET_FILTERS" };

// 초기 상태
const initialState: SearchFilters = {
  name: "",
  priceRange: [0, 10_000_000],
  inStock: false,
  category: [],
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
        ...initialState,
      };
    default:
      return state;
  }
}

interface SearchOptionContextType extends SearchFilters {
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

  const [state, dispatch] = useReducer(searchOptionReducer, {
    ...initialState,
  });

  const updateFilters = useCallback((filters: Partial<SearchFilters>) => {
    dispatch({ type: "SET_FILTERS", payload: filters });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: "RESET_FILTERS" });
  }, []);

  const contextValue: SearchOptionContextType = {
    ...state,
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
