import { ProductList } from "@/features/product-list/components/product-list";
import { SearchOption } from "@/features/product-list/components/search-option";
import { SearchOptionProvider } from "@/features/product-list/context/search-option-context";

export default function Home() {
  return (
    <div className="min-h-screen py-6 px-8 md:px-8">
      <SearchOptionProvider>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="lg:block hidden lg:w-1/6">
            <SearchOption />
          </div>
          <div className="lg:w-5/6">
            <ProductList />
          </div>
        </div>
      </SearchOptionProvider>
    </div>
  );
}
