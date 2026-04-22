import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategoria } from "../api/categoria.api";

export const useUpdateCategoria = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategoria,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
  });
};