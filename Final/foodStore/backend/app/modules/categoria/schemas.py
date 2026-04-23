from typing import Optional
from pydantic import BaseModel


class CategoriaBase(BaseModel):
    nombre: str
    descripcion: Optional[str] = None
    imagen_url: Optional[str] = None
    parent_id: Optional[int] = None


class CategoriaCreate(CategoriaBase):
    pass


class CategoriaPublic(CategoriaBase):
    id: int


class CategoriaUpdate(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    parent_id: Optional[int] = None
