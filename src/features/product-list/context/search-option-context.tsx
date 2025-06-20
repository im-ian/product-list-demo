"use client";

import { NullSymbol, NullSymbolType } from "@/types/common";
import React, { createContext, useReducer, useCallback } from "react";
import { useProductCategories } from "../hooks/use-product-categories";
import { SearchFilters } from "../type/product-search";

interface SearchOptionState {
  filters: SearchFilters;
  categories: string[];
}

type SearchOptionAction =
  | { type: "SET_FILTERS"; payload: Partial<SearchFilters> }
  | { type: "RESET_FILTERS" };

// 초기 상태
const initialState: SearchOptionState = {
  filters: {},
  categories: [],
};

function searchOptionReducer(
  state: SearchOptionState,
  action: SearchOptionAction
): SearchOptionState {
  switch (action.type) {
    case "SET_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    case "RESET_FILTERS":
      return {
        ...state,
        filters: {},
      };
  }
}

interface SearchOptionContextType extends SearchOptionState {
  updateFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;
}

export const SearchOptionContext = createContext<
  SearchOptionContextType | NullSymbolType
>(NullSymbol);

export function SearchOptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: categories } = useProductCategories();
  const [state, dispatch] = useReducer(searchOptionReducer, initialState);

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
    categories,
  };

  return (
    <SearchOptionContext.Provider value={contextValue}>
      {children}
    </SearchOptionContext.Provider>
  );
}
