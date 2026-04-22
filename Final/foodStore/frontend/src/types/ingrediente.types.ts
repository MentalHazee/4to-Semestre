import type { BaseEntity } from "./common.types";

export interface Ingrediente extends BaseEntity {
    nombre: string;
    descripcion?: string;
    es_alergeno: boolean;
}

export interface IngredienteCreate {
  nombre: string;
  descripcion?: string;
  es_alergeno?: boolean;
}

export interface IngredienteUpdate extends Partial<IngredienteCreate> {}