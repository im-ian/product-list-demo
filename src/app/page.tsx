"use client";

import { ProductList } from "@/features/product-list/components/product-list";
import { SearchOption } from "@/features/product-list/components/search-option";
import { SearchOptionProvider } from "@/features/product-list/context/search-option-context";
import { useProductList } from "@/features/product-list/hooks/use-product-list";
import { useMemo, useState } from "react";
import { getFilteredProducts } from "@/features/product-list/utils/filter";
import {
  INITIAL_PAGE,
  PAGE_SIZE,
} from "@/features/product-list/constants/product-list";
import { useSearchOption } from "@/features/product-list/hooks/use-search-option";
import { SlidersHorizontal } from "lucide-react";
import SearchOptionDrawer from "@/features/product-list/components/search-option-drawer";
import { Button } from "@/components/ui/button";

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

  const [isSearchOptionDrawerOpen, setIsSearchOptionDrawerOpen] =
    useState(false);

  const { filters } = useSearchOption();
  const products = data?.pages.flatMap((page) => page.data) || [];

  const filteredProducts = useMemo(
    () => getFilteredProducts(products, filters),
    [products, filters]
  );

  const productAutocompleteItems = filteredProducts.map((product) => ({
    value: product.name,
    label: product.name,
  }));

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="hidden lg:block lg:w-1/6">
        <SearchOption productAutocompleteItems={productAutocompleteItems} />
      </div>

      <div className="w-full lg:w-5/6">
        <div className="text-right visible lg:hidden">
          <Button
            variant="outline"
            onClick={() => setIsSearchOptionDrawerOpen(true)}
          >
            <SlidersHorizontal />
            <span className="text-sm">상품필터</span>
          </Button>
        </div>

        <ProductList
          filteredProducts={filteredProducts}
          isLoading={isLoading}
          error={error}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>

      <SearchOptionDrawer
        isOpen={isSearchOptionDrawerOpen}
        onOpenChange={setIsSearchOptionDrawerOpen}
        productAutocompleteItems={productAutocompleteItems}
      />
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
