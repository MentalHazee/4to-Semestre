// src/api/producto.api.ts

import { api } from "./client";
import type { Producto, ProductoCreate, ProductoUpdate} from "../types/producto.types";

export const getProductos = async (): Promise<Producto[]> => {
  const { data } = await api.get("/productos");
  return data;
};

export const getProductoById = async (id: number): Promise<Producto> => {
  const { data } = await api.get(`/productos/${id}`);
  return data;
};

export const createProducto = async (
  payload: ProductoCreate
): Promise<Producto> => {
  const { data } = await api.post("/productos", payload);
  return data;
};

export const updateProducto = async ({id, payload}: {
  id: number;
  payload: ProductoUpdate;
}): Promise<Producto> => {
  const { data } = await api.put(`/productos/${id}`, payload);
  return data;
};

export const deleteProducto = async (id: number): Promise<void> => {
  await api.delete(`/productos/${id}`);
};