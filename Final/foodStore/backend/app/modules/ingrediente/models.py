from datetime import datetime
from typing import Optional, List, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from app.modules.producto.models import Producto
from app.modules.productoIngrediente.models import ProductoIngrediente


class Ingrediente(SQLModel, table=True):
    __tablename__ = "ingredientes"

    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str = Field(index=True, unique=True, max_length=100)
    descripcion: Optional[str] = None
    es_alergeno: bool = Field(default=False)

    # Campos de auditoría
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relación N:N con Producto (a través de la tabla de enlace)
    productos: List["Producto"] = Relationship(
        back_populates="ingredientes", link_model=ProductoIngrediente
    )
