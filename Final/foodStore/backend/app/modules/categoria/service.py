from fastapi import HTTPException
from app.core.unit_of_work import UnitOfWork
from .schemas import CategoriaCreate, CategoriaUpdate
from .models import Categoria

class CategoriaService:
    def create_categoria(self, uow: UnitOfWork, categoria_data: CategoriaCreate):
        with uow:
            db_categoria = Categoria.model_validate(categoria_data)
            return uow.categorias.add(db_categoria)

    def get_all(self, uow: UnitOfWork):
        with uow:
            return uow.categorias.get_all()

    def get_by_id(self, uow: UnitOfWork, categoria_id: int):
        with uow:
            categoria = uow.categorias.get_by_id(categoria_id)
            if not categoria:
                raise HTTPException(status_code=404, detail="Categoría no encontrada")
            return categoria

    def update_categoria(self, uow: UnitOfWork, categoria_id: int, categoria_data: CategoriaUpdate):
        with uow:
            db_categoria = uow.categorias.get_by_id(categoria_id)
            if not db_categoria:
                raise HTTPException(status_code=404, detail="Categoría no encontrada")
            update_data = categoria_data.model_dump(exclude_unset=True)
            uow.categorias.update(db_categoria, update_data)
            return db_categoria

    def delete_categoria(self, uow: UnitOfWork, categoria_id: int):
        with uow:
            db_categoria = uow.categorias.get_by_id(categoria_id)
            if not db_categoria:
                raise HTTPException(status_code=404, detail="Categoría no encontrada")
            uow.categorias.delete(db_categoria)
            return {"message": "Categoría eliminada"}
