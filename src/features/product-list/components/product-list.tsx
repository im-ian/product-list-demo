"use client";

import { useProductList } from "../hooks/use-product-list";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/features/product/components/product-card";
import { ProductCardSkeleton } from "@/features/product/components/product-card-skeleton";

const INITIAL_PAGE = 1;
const PAGE_SIZE = 6;

export function ProductList() {
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

  const totalCount = data?.pages[0]?.totalCount || 0;
  const products = data?.pages.flatMap((page) => page.data) || [];

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-destructive">에러가 발생했습니다</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">제품 목록</h1>
        {!isLoading && (
          <Badge variant="secondary">총 {totalCount}개 상품이 있어요!</Badge>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <ProductCardSkeleton key={`skeleton-${index}`} index={index} />
            ))
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}
