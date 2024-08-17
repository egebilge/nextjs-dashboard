"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useDashboardList } from "../hooks/use-dashboard-list";
import { DashboardListType } from "../types";
import { CustomSpinner } from "@/components/custom-spinner";
import { formatDate } from "@/lib/format-date";

import { dashboardListColumnLabelMapping } from "../mock";
import { ActionBar } from "@/components/action-bar";
import { useTranslation } from "react-i18next";

function DashboardList() {
  const { t } = useTranslation("dashboard");
  const { data, isDashboardListLoading } = useDashboardList();

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <ActionBar onAddNewClick={() => {}} />
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>{t("dashboard")}</CardTitle>
                <CardDescription>{t("welcome-message")}</CardDescription>
              </CardHeader>
              <CardContent className="max-w-full overflow-x-auto">
                {isDashboardListLoading ? (
                  <CustomSpinner />
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow key="header" className="whitespace-nowrap">
                        {Object.keys(dashboardListColumnLabelMapping).map(
                          (column) => (
                            <TableHead key={column}>
                              {dashboardListColumnLabelMapping[column]}
                            </TableHead>
                          )
                        )}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.map((item: DashboardListType, index: number) => (
                        <TableRow key={index} className="truncate text-center">
                          {Object.keys(dashboardListColumnLabelMapping).map(
                            (column) => (
                              <TableCell key={column}>
                                {column === "Tarih"
                                  ? formatDate(
                                      item[
                                        column as keyof DashboardListType
                                      ] as string
                                    )
                                  : item[column as keyof DashboardListType]}
                              </TableCell>
                            )
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of{" "}
                  <strong>{data?.length}</strong> products
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export { DashboardList };
