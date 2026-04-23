import type { BaseEntity } from "./common.types";
import type { Categoria } from "./categoria.types";
import type { Ingrediente } from "./ingrediente.types";

export interface Producto extends BaseEntity {
    nombre: string;
    descripcion?: string;
    precio_base: number;
    imagenes_url: string[]; // CORRECCIÓN: Lista de strings
    stock_cantidad: number;
    disponible: boolean;

    categorias?: Categoria[];
    ingredientes?: Ingrediente[];
}

export interface ProductoCreate {
  nombre: string;
  descripcion?: string;
  precio_base: number;
  imagenes_url?: string[]; // CORRECCIÓN: Lista de strings
  stock_cantidad?: number;
  disponible?: boolean;

  categorias_ids?: number[];
  ingredientes_ids?: number[];
}

export interface ProductoUpdate extends Partial<ProductoCreate> {}

export interface ProductoCategoria {
  producto_id: number;
  categoria_id: number;
  es_principal?: boolean;
}

export interface ProductoIngrediente {
  producto_id: number;
  ingrediente_id: number;
  es_removible?: boolean;
}