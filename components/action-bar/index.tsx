import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

type ActionBarProps = {
  onAddNewClick: () => void;
};

const ActionBar = React.memo(({ onAddNewClick }: ActionBarProps) => {
  const pathname = usePathname();

  const isDashboard = useMemo(() => pathname === "/dashboard", [pathname]);

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
        {!isDashboard && (
          <Button size="sm" className="h-8 gap-1" onClick={onAddNewClick}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add New
            </span>
          </Button>
        )}
      </div>
    </div>
  );
});

export { ActionBar };
