import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProducto } from "../api/producto.api";

export const useDeleteProducto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProducto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productos"] });
    },
  });
};