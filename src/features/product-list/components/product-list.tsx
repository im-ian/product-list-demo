"use client";

import { useEffect, useRef, useCallback } from "react";
import { useProductList } from "../hooks/use-product-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

  const observerRef = useRef<HTMLDivElement>(null);

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

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          handleLoadMore();
        }
      },
      {
        rootMargin: "100px", // 100px 전에 로드 시작
        threshold: 0.1,
      }
    );

    if (observerRef.current && hasNextPage && !isFetchingNextPage) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, handleLoadMore]);

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

        {/* 무한 스크롤 로딩 중에 스켈레톤 표시 */}
        {isFetchingNextPage &&
          Array.from({ length: PAGE_SIZE }).map((_, index) => (
            <ProductCardSkeleton key={`skeleton-${index}`} index={index} />
          ))}
      </div>

      {/* 무한 스크롤 감지 엘리먼트 */}
      {hasNextPage && <div ref={observerRef} />}

      {/* 모든 제품을 로드한 경우 */}
      {!hasNextPage && products.length > 0 && (
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
