import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategoria } from "../api/categoria.api";

export const useDeleteCategoria = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategoria,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
  });
};