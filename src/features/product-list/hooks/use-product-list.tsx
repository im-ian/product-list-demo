import { useQuery, queryOptions } from "@tanstack/react-query";
import type { ProductListResponse } from "@/features/product-list/type/product-list";

const productListQueryOptions = queryOptions<ProductListResponse>({
  queryKey: ["product-list"] as const,
  queryFn: async () => {
    const response = await fetch("/api/product-list");
    if (!response.ok) {
      throw new Error("Failed to fetch product list.");
    }
    return response.json();
  },
  staleTime: 5 * 60 * 1000,
  refetchOnWindowFocus: false,
});

export function useProductList() {
  return useQuery(productListQueryOptions);
}
