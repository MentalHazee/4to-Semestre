import { useQuery } from "@tanstack/react-query";
import { getProductoById } from "../api/producto.api";

export const useProductoById = (id: number) => {
  return useQuery({
    queryKey: ["productos", id],
    queryFn: () => getProductoById(id),
    enabled: !!id,
  });
};
