import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProducto } from "../api/producto.api";

export const useCreateProducto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProducto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productos"] });
    },
  });
};