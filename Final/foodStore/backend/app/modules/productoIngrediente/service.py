from app.core.unit_of_work import UnitOfWork
from .schemas import ProductoIngredienteCreate
from .models import ProductoIngrediente

class ProductoIngredienteService:
    def associate(self, uow: UnitOfWork, data: ProductoIngredienteCreate):
        with uow:
            db_obj = ProductoIngrediente.model_validate(data)
            return uow.productos_ingredientes.add(db_obj)

    def get_all(self, uow: UnitOfWork):
        with uow:
            return uow.productos_ingredientes.get_all()
