import { Product } from "@/features/product/types/product";
import { SearchFilters } from "../type/product-search";

export function getFilteredProducts(
  products: Product[],
  { useFilter, name, priceRange, category, inStock }: SearchFilters
) {
  if (!useFilter) return products;

  let filteredProducts = structuredClone(products);

  if (name) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (priceRange) {
    const [minPrice, maxPrice] = priceRange;
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
  }

  if (category?.length) {
    filteredProducts = filteredProducts.filter((product) =>
      category.some((cat) => product.category.includes(cat))
    );
  }

  if (inStock) {
    filteredProducts = filteredProducts.filter((product) => product.inStock);
  }

  return filteredProducts;
}
