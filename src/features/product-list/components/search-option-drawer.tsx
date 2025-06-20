import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchOption } from "./search-option";

interface SearchOptionDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  productAutocompleteItems: { value: string; label: string }[];
}

export function SearchOptionDrawer({
  isOpen,
  onOpenChange,
  productAutocompleteItems,
}: SearchOptionDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="h-fit px-8">
        <ScrollArea className="h-[420px]">
          <div className="py-8">
            <SearchOption productAutocompleteItems={productAutocompleteItems} />
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}

export default SearchOptionDrawer;
