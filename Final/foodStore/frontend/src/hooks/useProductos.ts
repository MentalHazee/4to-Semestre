import { useQuery } from "@tanstack/react-query";
import { getProductos } from "../api/producto.api";

export const useProductos = () => {
  return useQuery({
    queryKey: ["productos"],
    queryFn: getProductos,
  });
};