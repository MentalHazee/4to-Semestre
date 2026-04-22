import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategoria } from "../api/categoria.api";

export const useCreateCategoria = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategoria,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
  });
};