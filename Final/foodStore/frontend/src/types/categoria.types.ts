import type { BaseEntity } from "./common.types";

export interface Categoria extends BaseEntity {
    nombre: string;
    descripcion?: string;
    imagen_url?: string;
    parent_id?: number | null;
}

export interface CategoriaCreate {
  nombre: string;
  descripcion?: string;
  imagen_url?: string;
  parent_id?: number | null;
}

export interface CategoriaUpdate extends Partial<CategoriaCreate> {}