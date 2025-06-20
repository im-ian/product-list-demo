"use client";

import { useProductList } from "../hooks/use-product-list";

export function ProductList() {
  const { data } = useProductList();

  console.log(data);

  return <div>ProductList</div>;
}
