"use client";

import { useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/features/product/components/product-card";
import { ProductCardSkeleton } from "@/features/product/components/product-card-skeleton";
import { useSearchOption } from "../hooks/use-search-option";
import type { Product } from "@/features/product/types/product";
import { getIsActiveSearchOption } from "../context/search-option-context";
import { PAGE_SIZE } from "../constants/product-list";

interface ProductListProps {
  totalCount: number;
  filteredProducts: Product[];
  isLoading: boolean;
  error: Error | null;
  fetchNextPage: () => Promise<any>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export function ProductList({
  totalCount,
  filteredProducts,
  isLoading,
  error,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: ProductListProps) {
  const { filters } = useSearchOption();
  const isActiveSearchOption = getIsActiveSearchOption(filters);

  const observerRef = useRef<HTMLDivElement>(null);

  const canLoadMore = !isActiveSearchOption && hasNextPage;

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && canLoadMore) {
          handleLoadMore();
        }
      },
      {
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    if (observerRef.current && canLoadMore) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [canLoadMore, handleLoadMore]);

  return (
    <div className="container mx-auto space-y-6">
      <h1 className="text-3xl font-bold">제품 목록</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(() => {
          if (error) {
            return (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <p className="text-destructive">에러가 발생했습니다</p>
                  <p className="text-sm text-muted-foreground">
                    {error.message}
                  </p>
                </div>
              </div>
            );
          }

          if (isLoading) {
            return Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <ProductCardSkeleton key={`skeleton-${index}`} index={index} />
            ));
          }

          if (filteredProducts.length === 0) {
            return (
              <div className="col-span-full flex items-center justify-center min-h-[400px]">
                <p className="text-muted-foreground">
                  검색 결과에 맞는 상품이 없습니다.
                </p>
              </div>
            );
          }

          return (
            <>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}

              {isFetchingNextPage &&
                Array.from({ length: PAGE_SIZE }).map((_, index) => (
                  <ProductCardSkeleton
                    key={`isFetchingNextPage-skeleton-${index}`}
                    index={index}
                  />
                ))}
            </>
          );
        })()}
      </div>

      {canLoadMore && <div ref={observerRef} />}

      {!hasNextPage && filteredProducts.length > 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">모든 제품을 불러왔습니다. 🚀</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            맨 위로 이동
          </Button>
        </div>
      )}
    </div>
  );
}
