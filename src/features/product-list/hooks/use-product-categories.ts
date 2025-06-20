import { useQuery } from "@tanstack/react-query";
import { ProductCategoryResponse } from "../type/product-search";

export function useProductCategories() {
  return useQuery({
    queryKey: ["product-categories"],
    queryFn: () =>
      fetch("/api/categories")
        .then((res) => res.json() as Promise<ProductCategoryResponse>)
        .then((data) => data.data),
  });
}
