import * as z from "zod";

export const SearchFiltersSchema = z.object({
  useFilter: z.boolean().optional(),
  name: z.string().optional(),
  priceRange: z.tuple([z.number(), z.number()]).optional(),
  inStock: z.boolean().optional(),
  category: z.array(z.string()).optional(),
});

export type SearchFilters = z.infer<typeof SearchFiltersSchema>;

export type ProductCategoryResponse = { data: string[] };
