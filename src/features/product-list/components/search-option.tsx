"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HelpCircle } from "lucide-react";
import RangeSlider from "react-range-slider-input";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSearchOption } from "../hooks/use-search-option";
import { LabeledCheckbox } from "@/features/shared/components/labeled-checkbox";
import { SearchFilters, SearchFiltersSchema } from "../type/product-search";

import "react-range-slider-input/dist/style.css";
import { formatPrice } from "@/features/product/utils/price";

const PRICE_RANGE_MIN = 0;
const PRICE_RANGE_MAX = 5_000_000;

export function SearchOption() {
  const { categories, updateFilters } = useSearchOption();

  const form = useForm<SearchFilters>({
    resolver: zodResolver(SearchFiltersSchema),
    defaultValues: {
      name: "",
      priceRange: [PRICE_RANGE_MIN, PRICE_RANGE_MAX],
      inStock: undefined,
      category: [],
    },
  });

  const handleSearchChange = (value: string) => {
    form.setValue("name", value);
    updateFilters({ name: value || undefined });
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const currentCategories = form.getValues("category") || [];
    let newCategories: string[];

    if (checked) {
      newCategories = [...currentCategories, category];
    } else {
      newCategories = currentCategories.filter((c) => c !== category);
    }

    form.setValue("category", newCategories);
    updateFilters({
      category: newCategories.length > 0 ? newCategories : undefined,
    });
  };

  const handleOutOfStockChange = (checked: boolean) => {
    form.setValue("inStock", checked);
    updateFilters({ inStock: checked });
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        {/* 검색 입력 */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-bold">검색</FormLabel>
              <FormControl>
                <Input
                  placeholder="제품명을 입력하세요."
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleSearchChange(e.target.value);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* 품절 상품 표시 여부 */}
        <FormField
          control={form.control}
          name="inStock"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="text-base">품절 상품 표시</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">
                        품절 상품 표시
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        이 옵션을 활성화하면 재고가 없는 품절 상품도 함께
                        표시됩니다. 기본적으로는 재고가 있는 상품만 표시됩니다.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    handleOutOfStockChange(checked);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* 카테고리 필터 */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-bold">카테고리</FormLabel>
              {categories.length > 0 ? (
                <>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      {categories.map((category) => (
                        <LabeledCheckbox
                          key={category}
                          label={category}
                          checked={(field.value || []).includes(category)}
                          onCheckedChange={(checked) => {
                            handleCategoryChange(category, checked);
                          }}
                        />
                      ))}
                    </div>
                  </FormControl>
                </>
              ) : (
                Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-4 bg-gray-200 rounded animate-pulse"
                  />
                ))
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priceRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-bold">최소 가격</FormLabel>
              <FormControl>
                <RangeSlider
                  step={PRICE_RANGE_MAX / 100}
                  min={PRICE_RANGE_MIN}
                  max={PRICE_RANGE_MAX}
                  value={field.value}
                  onInput={([min, max]) => {
                    field.onChange([min, max]);
                    updateFilters({ priceRange: [min, max] });
                  }}
                />
              </FormControl>
              <div className="flex justify-between">
                <span>{formatPrice(field.value?.[0] ?? PRICE_RANGE_MIN)}</span>
                <span>~</span>
                <span>{formatPrice(field.value?.[1] ?? PRICE_RANGE_MAX)}</span>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
