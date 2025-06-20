"use client";

import { ProductList } from "@/features/product-list/components/product-list";
import { SearchOption } from "@/features/product-list/components/search-option";
import {
  SearchOptionProvider,
  useSearchOption,
} from "@/features/product-list/context/search-option-context";
import { useProductList } from "@/features/product-list/hooks/use-product-list";
import { useMemo } from "react";
import { getFilteredProducts } from "@/features/product-list/utils/filter";

const INITIAL_PAGE = 1;
const PAGE_SIZE = 6;

function ProductListPage() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProductList({
    initialPage: INITIAL_PAGE,
    pageSize: PAGE_SIZE,
  });

  const { filters } = useSearchOption();
  const products = data?.pages.flatMap((page) => page.data) || [];

  const filteredProducts = useMemo(
    () => getFilteredProducts(products, filters),
    [products, filters]
  );

  const totalCount = data?.pages[0]?.totalCount || 0;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="lg:block hidden lg:w-1/6">
        <SearchOption
          products={filteredProducts}
          isLoading={isLoading}
          error={error}
        />
      </div>
      <div className="lg:w-5/6">
        <ProductList
          totalCount={totalCount}
          filteredProducts={filteredProducts}
          isLoading={isLoading}
          error={error}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen py-6 px-8 md:px-8">
      <SearchOptionProvider>
        <ProductListPage />
      </SearchOptionProvider>
    </div>
  );
}
