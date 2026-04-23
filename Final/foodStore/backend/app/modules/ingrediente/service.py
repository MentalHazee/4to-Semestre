from fastapi import HTTPException
from app.core.unit_of_work import UnitOfWork
from .schemas import IngredienteCreate, IngredienteUpdate
from .models import Ingrediente

class IngredienteService:
    def create_ingrediente(self, uow: UnitOfWork, ingrediente_data: IngredienteCreate):
        with uow:
            db_ingrediente = Ingrediente.model_validate(ingrediente_data)
            return uow.ingredientes.add(db_ingrediente)

    def get_all(self, uow: UnitOfWork):
        with uow:
            return uow.ingredientes.get_all()

    def get_by_id(self, uow: UnitOfWork, ingrediente_id: int):
        with uow:
            ingrediente = uow.ingredientes.get_by_id(ingrediente_id)
            if not ingrediente:
                raise HTTPException(status_code=404, detail="Ingrediente no encontrado")
            return ingrediente

    def update_ingrediente(self, uow: UnitOfWork, ingrediente_id: int, ingrediente_data: IngredienteUpdate):
        with uow:
            db_ingrediente = uow.ingredientes.get_by_id(ingrediente_id)
            if not db_ingrediente:
                raise HTTPException(status_code=404, detail="Ingrediente no encontrado")
            update_data = ingrediente_data.model_dump(exclude_unset=True)
            uow.ingredientes.update(db_ingrediente, update_data)
            return db_ingrediente

    def delete_ingrediente(self, uow: UnitOfWork, ingrediente_id: int):
        with uow:
            db_ingrediente = uow.ingredientes.get_by_id(ingrediente_id)
            if not db_ingrediente:
                raise HTTPException(status_code=404, detail="Ingrediente no encontrado")
            uow.ingredientes.delete(db_ingrediente)
            return {"message": "Ingrediente eliminado"}
