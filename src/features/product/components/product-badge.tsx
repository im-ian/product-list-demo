import { Badge, badgeVariants } from "@/components/ui/badge";
import type { VariantProps } from "class-variance-authority";

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

const BADGE_VARIANTS: Record<string, BadgeVariant> = {
  해외배송: "default",
} as const;

export function ProductBadge({ category }: { category: string }) {
  return (
    <Badge
      variant={
        BADGE_VARIANTS[category as keyof typeof BADGE_VARIANTS] || "outline"
      }
      className="text-xs shrink-0"
    >
      {category}
    </Badge>
  );
}
