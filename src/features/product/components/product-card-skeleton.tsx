import { Card, CardContent } from "@/components/ui/card";

interface ProductCardSkeletonProps {
  index: number;
}

export function ProductCardSkeleton({ index }: ProductCardSkeletonProps) {
  return (
    <Card key={`skeleton-${index}`} className="overflow-hidden pt-0">
      <div className="aspect-square bg-gray-200 animate-pulse" />
      <CardContent className="pt-4 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-5 bg-gray-200 rounded animate-pulse w-1/4" />
        </div>
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
        <div className="pt-4 flex items-center justify-between">
          <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
        </div>
      </CardContent>
    </Card>
  );
}
