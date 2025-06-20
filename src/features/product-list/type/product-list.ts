import type { PaginatedResponse } from "@/types/api";
import type { Product } from "@/features/product/types/product";

export type ProductListResponse = PaginatedResponse<Product>;
