import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";

type ActionBarProps = {
  onAddNewClick: () => void;
};

function ActionBar({ onAddNewClick }: ActionBarProps) {
  return (
    <div className="flex items-center">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="draft">Draft</TabsTrigger>
        <TabsTrigger value="archived" className="hidden sm:flex">
          Archived
        </TabsTrigger>
      </TabsList>
      <div className="ml-auto flex items-center gap-2">
        <Button size="sm" className="h-8 gap-1" onClick={onAddNewClick}>
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add New
          </span>
        </Button>
      </div>
    </div>
  );
}

export { ActionBar };
