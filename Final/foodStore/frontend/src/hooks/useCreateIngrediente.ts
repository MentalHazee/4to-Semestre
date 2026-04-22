import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createIngrediente } from "../api/ingrediente.api";

export const useCreateIngrediente = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createIngrediente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredientes"] });
    },
  });
};