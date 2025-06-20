import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Product } from "../types/product";
import { formatPrice, getDiscountRate } from "../utils/price";
import { ProductBadge } from "./product-badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discountRate = getDiscountRate(product.price, product.discountedPrice);

  return (
    <Card
      className={cn(
        "overflow-hidden hover:shadow-lg transition-shadow pt-0",
        !product.inStock && "opacity-60"
      )}
    >
      <div className="aspect-square overflow-hidden relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-2 right-2">
          <Badge
            variant={product.inStock ? "default" : "destructive"}
            className="text-xs"
          >
            {product.inStock ? "재고있음" : "재고없음"}
          </Badge>
        </div>
      </div>
      <CardContent className="space-y-2">
        <div className="flex items-start gap-2">
          {product.category.map((category) => (
            <ProductBadge key={category} category={category} />
          ))}
        </div>
        <h3 className="font-semibold text-xl line-clamp-2">{product.name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="pt-4 flex items-end gap-2">
          {product.discountedPrice && (
            <span className="font-bold text-lg lg:text-lg text-red-500">
              {discountRate}%
            </span>
          )}
          {product.discountedPrice && (
            <span className="font-bold text-lg lg:text-lg">
              {formatPrice(product.discountedPrice)}원
            </span>
          )}
          <span
            className={cn(
              "font-bold",
              product.discountedPrice
                ? "text-gray-400 text-xs sm:text-sm line-through"
                : "text-lg sm:text-lg lg:text-xl"
            )}
          >
            {formatPrice(product.price)}원
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
