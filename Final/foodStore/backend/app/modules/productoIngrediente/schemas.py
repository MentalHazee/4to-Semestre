from pydantic import BaseModel


class ProductoIngredienteBase(BaseModel):
    producto_id: int
    ingrediente_id: int
    es_removible: bool = False


class ProductoIngredienteCreate(ProductoIngredienteBase):
    pass


class ProductoIngredientePublic(ProductoIngredienteBase):
    pass
