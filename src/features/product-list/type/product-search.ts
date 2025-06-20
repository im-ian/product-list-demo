export interface SearchFilters {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  category?: string;
}

export type ProductCategoryResponse = { data: string[] };
