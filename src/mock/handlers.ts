import { http, HttpResponse } from "msw";
import productListData from "./data/products.json";

export const handlers = [
  http.get("/api/product-list", async ({ request }) => {
    // 3초 딜레이 추가
    await new Promise((resolve) => setTimeout(resolve, 1500));

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

  // 전체 카테고리 조회 API
  http.get("/api/categories", async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 모든 제품의 카테고리를 수집하고 중복 제거
    const allCategories = new Set<string>();
    productListData.forEach((product) => {
      product.category.forEach((cat) => allCategories.add(cat));
    });

    return HttpResponse.json({
      data: Array.from(allCategories).sort(),
    });
  }),

  // 검색 API
  http.get("/api/search", async ({ request }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10");
    const name = url.searchParams.get("name") || "";
    const minPrice = url.searchParams.get("minPrice");
    const maxPrice = url.searchParams.get("maxPrice");
    const inStock = url.searchParams.get("inStock");
    const category = url.searchParams.get("category");

    let filteredProducts = [...productListData];

    // 이름 검색 (대소문자 구분 없이)
    if (name) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    // 가격 범위 검색
    if (minPrice) {
      const min = parseInt(minPrice);
      filteredProducts = filteredProducts.filter((product) => {
        const price = product.discountedPrice || product.price;
        return price >= min;
      });
    }

    if (maxPrice) {
      const max = parseInt(maxPrice);
      filteredProducts = filteredProducts.filter((product) => {
        const price = product.discountedPrice || product.price;
        return price <= max;
      });
    }

    // 재고 여부 검색
    if (inStock !== null && inStock !== undefined) {
      const stockFilter = inStock === "true";
      filteredProducts = filteredProducts.filter(
        (product) => product.inStock === stockFilter
      );
    }

    // 카테고리 검색
    if (category) {
      filteredProducts = filteredProducts.filter((product) =>
        product.category.includes(category)
      );
    }

    const totalCount = filteredProducts.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return HttpResponse.json({
      data: paginatedProducts,
      totalCount,
      page,
      pageSize,
      filters: {
        name,
        minPrice: minPrice ? parseInt(minPrice) : null,
        maxPrice: maxPrice ? parseInt(maxPrice) : null,
        inStock: inStock !== null ? inStock === "true" : null,
        category,
      },
    });
  }),
];
