import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteIngrediente } from "../api/ingrediente.api";

export const useDeleteIngrediente = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteIngrediente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredientes"] });
    },
  });
};