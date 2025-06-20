"use client";

import { useState } from "react";
import { useProductList } from "../hooks/use-product-list";

export function ProductList() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data } = useProductList({ initialPage: page, pageSize });

  console.log(data);

  const products = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div>
      <div>ProductList</div>
      <div>
        {products.map((product) => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div>
    </div>
  );
}
