import { useQuery, queryOptions } from "@tanstack/react-query";
import type { ProductListResponse } from "@/features/product-list/type/product-list";

interface UseProductListParams {
  page: number;
  pageSize: number;
}

const createProductListQueryOptions = ({
  page = 1,
  pageSize = 10,
}: UseProductListParams) =>
  queryOptions<ProductListResponse>({
    queryKey: ["product-list", page, pageSize] as const,
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      });

      const response = await fetch(`/api/product-list?${params}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product list.");
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

export function useProductList(params: UseProductListParams) {
  const queryOptions = createProductListQueryOptions(params);
  return useQuery(queryOptions);
}
