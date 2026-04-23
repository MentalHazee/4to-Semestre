from datetime import datetime
from typing import Optional, List, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship, Column, ARRAY, String
from decimal import Decimal

from app.modules.productoCategoria.models import ProductoCategoria
from app.modules.productoIngrediente.models import ProductoIngrediente

if TYPE_CHECKING:
    from app.modules.categoria.models import Categoria
    from app.modules.ingrediente.models import Ingrediente


class Producto(SQLModel, table=True):
    __tablename__ = "productos"

    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str = Field(max_length=150, index=True)
    descripcion: Optional[str] = None

    precio_base: Decimal = Field(default=0, max_digits=10, decimal_places=2)

    imagenes_url: List[str] = Field(default=[], sa_column=Column(ARRAY(String)))

    stock_cantidad: int = Field(default=0, ge=0)
    disponible: bool = Field(default=True)

    # Campos de auditoría
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    deleted_at: Optional[datetime] = None

    # --- Relaciones ---

    # Muchos-a-Muchos con Categorías
    categorias: List["Categoria"] = Relationship(
        back_populates="productos", link_model=ProductoCategoria
    )

    # Muchos-a-Muchos con Ingredientes
    ingredientes: List["Ingrediente"] = Relationship(
        back_populates="productos", link_model=ProductoIngrediente
    )
