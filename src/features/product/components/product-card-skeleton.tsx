import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ProductCardSkeletonProps {
  index: number;
}

export function ProductCardSkeleton({ index }: ProductCardSkeletonProps) {
  return (
    <Card key={`skeleton-${index}`} className="overflow-hidden pt-0">
      <div className="aspect-square bg-gray-200 animate-pulse" />
      <CardHeader className="pb-2">
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded animate-pulse" />
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-2">
        <div className="h-3 bg-gray-200 rounded animate-pulse" />
        <div className="flex items-center justify-between">
          <div className="h-5 bg-gray-200 rounded animate-pulse w-1/2" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
        </div>
      </CardContent>
    </Card>
  );
}
