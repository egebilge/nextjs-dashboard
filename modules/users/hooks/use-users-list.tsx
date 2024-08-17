import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/lib/api";
import { UsersListType } from "../types";

function useUsersList() {
  const queryClient = useQueryClient();

  const { data: usersList, isLoading: isUsersListLoading } = useQuery({
    queryKey: ["usersList"],
    queryFn: async () => {
      try {
        const response = await API.post("/Kara/Getir_Kod", {
          db_Id: 9,
          Adi: "ALL?",
        });

        return response.data.value;
      } catch (error) {
        console.error("API call failed:", error);
        throw new Error("Failed to fetch users list");
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const addUserMutation = useMutation({
    mutationFn: async (newUser: UsersListType) => {
      try {
        const response = await API.post("/Kara/Ekle", newUser);
        return response.data.value;
      } catch (error) {
        console.error("API call failed:", error);
        throw new Error("Failed to add or update user");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usersList"] });
    },
  });

  return {
    usersList,
    isUsersListLoading,
    addUser: addUserMutation.mutateAsync,
  };
}

export { useUsersList };
