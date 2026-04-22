// src/api/ingrediente.api.ts

import { api } from "./client";
import type { Ingrediente, IngredienteCreate, IngredienteUpdate } from "../types/ingrediente.types";

export const getIngredientes = async (): Promise<Ingrediente[]> => {
  const { data } = await api.get("/ingredientes");
  return data;
};

export const createIngrediente = async (payload: IngredienteCreate): Promise<Ingrediente> => {
  const { data } = await api.post("/ingredientes", payload);
  return data;
};

export const updateIngrediente = async ({ id, payload }: {
  id: number;
  payload: IngredienteUpdate;
}): Promise<Ingrediente> => {
  const { data } = await api.put(`/ingredientes/${id}`, payload);
  return data;
};

export const deleteIngrediente = async (id: number): Promise<void> => {
  await api.delete(`/ingredientes/${id}`);
};