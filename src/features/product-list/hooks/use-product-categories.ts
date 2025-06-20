import { useQuery } from "@tanstack/react-query";

export function useProductCategories() {
  return useQuery({
    queryKey: ["product-categories"],
    queryFn: () => fetch("/api/categories").then((res) => res.json()),
  });
}
