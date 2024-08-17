"use client";

import { useState, useEffect } from "react";
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

import { CustomSpinner } from "@/components/custom-spinner";
import { useUsersList } from "../hooks/use-users-list";
import { userListColumnLabelMapping } from "../mock";
import { UsersListType } from "../types";
import { formatDate } from "@/lib/format-date";
import { ActionBar } from "@/components/action-bar";
import { AddUserModal } from "@/components/add-user-modal";
import { useTranslation } from "react-i18next";

function UsersList() {
  const { t } = useTranslation("users");
  const { usersList, isUsersListLoading, addUser } = useUsersList();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UsersListType | null>(null);
  const [localUsers, setLocalUsers] = useState<UsersListType[]>([]);

  useEffect(() => {
    if (usersList) {
      setLocalUsers(usersList);
    }
  }, [usersList]);

  const handleAddUser = async (newUser: UsersListType) => {
    try {
      const addedUser = await addUser(newUser);

      if (!addedUser || !addedUser.Id) {
        throw new Error(
          "Failed to add or update user, received invalid response."
        );
      }

      setLocalUsers((prevUsers) => {
        const isExistingUser = prevUsers.some(
          (user) => user.Id === addedUser.Id
        );

        if (isExistingUser) {
          return prevUsers.map((user) =>
            user.Id === addedUser.Id ? addedUser : user
          );
        } else {
          return [...prevUsers, addedUser];
        }
      });
    } catch (error) {
      console.error("Error adding or updating user:", error);
    }
  };

  const handleEditUser = (user: UsersListType) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <ActionBar onAddNewClick={() => setIsModalOpen(true)} />
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>{t("users")}</CardTitle>
                  <CardDescription>{t("welcome-message")}</CardDescription>
                </CardHeader>
                <CardContent className="max-w-full overflow-x-auto">
                  {isUsersListLoading ? (
                    <CustomSpinner />
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow key="header" className="whitespace-nowrap">
                          {Object.keys(userListColumnLabelMapping).map(
                            (column) => (
                              <TableHead key={column}>
                                {userListColumnLabelMapping[column]}
                              </TableHead>
                            )
                          )}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {localUsers.map(
                          (item: UsersListType, index: number) => (
                            <TableRow
                              key={index}
                              className="truncate"
                              onClick={() => handleEditUser(item)}
                            >
                              {Object.keys(userListColumnLabelMapping).map(
                                (column) => (
                                  <TableCell key={column}>
                                    {item &&
                                    column.includes("tarihi") &&
                                    item[column as keyof typeof item]
                                      ? formatDate(
                                          item[
                                            column as keyof typeof item
                                          ] as string
                                        )
                                      : item &&
                                        item[column as keyof typeof item] !==
                                          undefined
                                      ? item[column as keyof typeof item]
                                      : "N/A"}
                                  </TableCell>
                                )
                              )}
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of{" "}
                    <strong>{localUsers.length}</strong> users
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentUser(null);
        }}
        onAddUser={handleAddUser}
        existingUser={currentUser}
      />
    </>
  );
}

export { UsersList };
