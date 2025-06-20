"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HelpCircle } from "lucide-react";
import RangeSlider from "react-range-slider-input";
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
import { useProductList } from "../hooks/use-product-list";
import { AutoComplete } from "@/features/shared/components/autocomplete-input";

const PRICE_RANGE_MIN = 0;
const PRICE_RANGE_MAX = 5_000_000;

export function SearchOption() {
  const { categories, updateFilters } = useSearchOption();
  const { data } = useProductList();

  const form = useForm<SearchFilters>({
    resolver: zodResolver(SearchFiltersSchema),
    defaultValues: {
      useFilter: true,
      name: "",
      priceRange: [PRICE_RANGE_MIN, PRICE_RANGE_MAX],
      inStock: true,
      category: [],
    },
  });

  const handleFilterChange = (field: keyof SearchFilters, value: any) => {
    form.setValue(field, value);
    updateFilters({ ...form.getValues(), [field]: value });
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        {/* 필터 사용 여부 */}
        <FormField
          control={form.control}
          name="useFilter"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="text-sm font-bold">
                  필터 사용 여부
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">
                        필터 사용 여부
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        이 옵션을 비활성화하면 모든 필터가 비활성화 됩니다.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) =>
                    handleFilterChange("useFilter", checked)
                  }
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
                <FormLabel className="text-sm font-bold">
                  재고 있는 상품만 표시
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">
                        재고 있는 상품만 표시
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        이 옵션을 활성화하면 재고가 없는 상품은 필터링됩니다.
                        기본적으로는 재고가 있는 상품만 표시됩니다.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) =>
                    handleFilterChange("inStock", checked)
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* 검색 입력 */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-bold">검색</FormLabel>
              <FormControl>
                <AutoComplete
                  searchValue={field.value || ""}
                  selectedValue={field.value || ""}
                  placeholder="제품명을 입력하세요."
                  onSearchValueChange={(value) =>
                    handleFilterChange("name", value)
                  }
                  onSelectedValueChange={(value) =>
                    handleFilterChange("name", value)
                  }
                  items={
                    data?.pages.flatMap((page) =>
                      page.data.map((product) => ({
                        value: product.name,
                        label: product.name,
                      }))
                    ) || []
                  }
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
              <FormLabel className="text-sm font-bold">카테고리</FormLabel>
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
                            const currentCategories = field.value || [];
                            const newCategories = checked
                              ? [...currentCategories, category]
                              : currentCategories.filter((c) => c !== category);
                            handleFilterChange("category", newCategories);
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

        {/* 가격 범위 */}
        <FormField
          control={form.control}
          name="priceRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-bold">가격 범위</FormLabel>
              <FormControl>
                <div className="py-2">
                  <RangeSlider
                    step={PRICE_RANGE_MAX / 100}
                    min={PRICE_RANGE_MIN}
                    max={PRICE_RANGE_MAX}
                    value={field.value}
                    onInput={([min, max]) =>
                      handleFilterChange("priceRange", [min, max])
                    }
                  />
                </div>
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
