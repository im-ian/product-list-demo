export interface Product {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  description: string;
  imageUrl: string;
  category: string;
  inStock: boolean;
}
