import { http, HttpResponse } from "msw";
import productListData from "./data/products.json";

export const handlers = [
  http.get("/api/product-list", async ({ request }) => {
    // 3초 딜레이 추가
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10");

    const totalCount = productListData.length;

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = productListData.slice(startIndex, endIndex);

    return HttpResponse.json({
      data: paginatedProducts,
      totalCount,
      page,
      pageSize,
    });
  }),
];
