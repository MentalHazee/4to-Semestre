import { useQuery } from "@tanstack/react-query";
import { getIngredientes } from "../api/ingrediente.api";

export const useIngredientes = () => {
  return useQuery({
    queryKey: ["ingredientes"],
    queryFn: getIngredientes,
  });
};