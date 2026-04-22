import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProducto } from "../api/producto.api";

export const useUpdateProducto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProducto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productos"] });
    },
  });
};