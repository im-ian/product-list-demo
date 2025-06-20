import { http, HttpResponse } from "msw";
import productListData from "./data/products.json";

export const handlers = [
  http.get("/api/product-list", async () => {
    // 3초 딜레이 추가
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return HttpResponse.json(productListData);
  }),
];
