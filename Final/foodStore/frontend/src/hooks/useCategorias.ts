import { useQuery } from "@tanstack/react-query";
import { getCategorias } from "../api/categoria.api";

export const useCategorias = () => {
  return useQuery({
    queryKey: ["categorias"],
    queryFn: getCategorias,
  });
};