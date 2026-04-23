from app.core.unit_of_work import UnitOfWork
from .schemas import ProductoCategoriaCreate
from .models import ProductoCategoria

class ProductoCategoriaService:
    def associate(self, uow: UnitOfWork, data: ProductoCategoriaCreate):
        with uow:
            db_obj = ProductoCategoria.model_validate(data)
            return uow.productos_categorias.add(db_obj)

    def get_all(self, uow: UnitOfWork):
        with uow:
            return uow.productos_categorias.get_all()
