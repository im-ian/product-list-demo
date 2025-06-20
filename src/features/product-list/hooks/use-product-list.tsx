import { useInfiniteQuery } from "@tanstack/react-query";
import type { ProductListResponse } from "@/features/product-list/type/product-list";

interface UseProductListParams {
  initialPage?: number;
  pageSize?: number;
}

export function useProductList(params: UseProductListParams = {}) {
  const { initialPage = 1, pageSize = 10 } = params;

  return useInfiniteQuery({
    queryKey: ["product-list", pageSize] as const,
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        page: pageParam.toString(),
        pageSize: pageSize.toString(),
      });

      const response = await fetch(`/api/product-list?${params}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product list.");
      }
      return response.json() as Promise<ProductListResponse>;
    },
    initialPageParam: initialPage,
    getNextPageParam: (lastPage: ProductListResponse, allPages) => {
      const totalPages = Math.ceil(lastPage.totalCount / lastPage.pageSize);
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
