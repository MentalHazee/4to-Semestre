from typing import Optional
from sqlmodel import SQLModel, Field

class ProductoIngrediente(SQLModel, table=True):
    __tablename__ = "productos_ingredientes"

    producto_id: int = Field(foreign_key="productos.id", primary_key=True)
    ingrediente_id: int = Field(foreign_key="ingredientes.id", primary_key=True)
    
    es_removible: bool = Field(default=False)
