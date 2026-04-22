import { api } from "./client";
import type { Categoria, CategoriaCreate, CategoriaUpdate } from "../types/categoria.types";

//GET ALL
export const getCategorias = async (): Promise<Categoria[]> => {
    const {data} = await api.get("/categorias");
    return data;
}

//GET ONE
export const getCategoriaById = async (id: number): Promise<Categoria> => {
    const {data} = await api.get(`/categorias/${id}`);
    return data;
}

// CREATE
export const createCategoria = async (payload: CategoriaCreate): Promise<Categoria> => {
  const { data } = await api.post("/categorias", payload);
  return data;
};

// UPDATE
export const updateCategoria = async ({id, payload,}: {id: number; payload: CategoriaUpdate;}): Promise<Categoria> => {
  const { data } = await api.put(`/categorias/${id}`, payload);
  return data;
};

// DELETE
export const deleteCategoria = async (id: number): Promise<void> => {
  await api.delete(`/categorias/${id}`);
};