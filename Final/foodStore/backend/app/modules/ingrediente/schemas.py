from typing import Optional
from pydantic import BaseModel

class IngredienteBase(BaseModel):
    nombre: str
    descripcion: Optional[str] = None
    es_alergeno: bool = False

class IngredienteCreate(IngredienteBase):
    pass

class IngredientePublic(IngredienteBase):
    id: int

class IngredienteUpdate(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    es_alergeno: Optional[bool] = None
