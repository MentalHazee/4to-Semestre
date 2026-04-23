from typing import Optional, List
from pydantic import BaseModel
from decimal import Decimal

# Importamos los schemas para las relaciones
from app.modules.categoria.schemas import CategoriaPublic
from app.modules.ingrediente.schemas import IngredientePublic


class ProductoBase(BaseModel):
    nombre: str
    descripcion: Optional[str] = None
    precio_base: Decimal = Decimal("0.0")
    imagenes_url: List[str] = []
    stock_cantidad: int = 0
    disponible: bool = True


class ProductoCreate(ProductoBase):
    categorias_ids: Optional[List[int]] = []
    ingredientes_ids: Optional[List[int]] = []


class ProductoPublic(ProductoBase):
    id: int
    # Agregamos las relaciones para que FastAPI las incluya en el JSON
    categorias: List[CategoriaPublic] = []
    ingredientes: List[IngredientePublic] = []


class ProductoUpdate(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    precio_base: Optional[Decimal] = None
    stock_cantidad: Optional[int] = None
    disponible: Optional[bool] = None
    categorias_ids: Optional[List[int]] = None
    ingredientes_ids: Optional[List[int]] = None
