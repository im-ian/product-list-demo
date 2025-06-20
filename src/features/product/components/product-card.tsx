import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Product } from "../types/product";
import { formatPrice, getDiscountRate } from "../utils/price";

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
      <CardHeader className="pb-2 gap-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-xl line-clamp-2">{product.name}</h3>
          <Badge variant="outline" className="text-xs shrink-0">
            {product.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-2">
        <p className="text-xs text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-end gap-2">
          {product.discountedPrice && (
            <span className="font-bold text-lg lg:text-xl text-red-500">
              {discountRate}%
            </span>
          )}
          {product.discountedPrice && (
            <span className="font-bold text-lg lg:text-xl">
              {formatPrice(product.discountedPrice)}원
            </span>
          )}
          <span
            className={cn(
              "font-bold",
              product.discountedPrice
                ? "text-gray-400 text-xs md:text-sm line-through"
                : "text-xl sm:text-lg xl:text-xl"
            )}
          >
            {formatPrice(product.price)}원
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
