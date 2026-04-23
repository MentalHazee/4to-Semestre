from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field

class ProductoCategoria(SQLModel, table=True):
    __tablename__ = "productos_categorias"

    producto_id: int = Field(foreign_key="productos.id", primary_key=True)
    categoria_id: int = Field(foreign_key="categorias.id", primary_key=True)
    
    es_principal: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
