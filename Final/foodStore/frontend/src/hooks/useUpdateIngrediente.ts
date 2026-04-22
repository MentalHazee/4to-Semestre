import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateIngrediente } from "../api/ingrediente.api";

export const useUpdateIngrediente = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateIngrediente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredientes"] });
    },
  });
};