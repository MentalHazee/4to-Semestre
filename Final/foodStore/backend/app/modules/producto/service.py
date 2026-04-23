from fastapi import HTTPException
from sqlmodel import select
from app.core.unit_of_work import UnitOfWork
from .schemas import ProductoCreate, ProductoUpdate
from .models import Producto
from app.modules.productoCategoria.models import ProductoCategoria
from app.modules.productoIngrediente.models import ProductoIngrediente

class ProductoService:
    def create_producto(self, uow: UnitOfWork, producto_data: ProductoCreate):
        with uow:
            data_dict = producto_data.model_dump()
            categorias_ids = data_dict.pop("categorias_ids", [])
            ingredientes_ids = data_dict.pop("ingredientes_ids", [])

            db_producto = Producto.model_validate(data_dict)
            uow.productos.add(db_producto)
            uow._session.flush()

            for cat_id in categorias_ids:
                uow.productos_categorias.add(ProductoCategoria(producto_id=db_producto.id, categoria_id=cat_id))
            for ing_id in ingredientes_ids:
                uow.productos_ingredientes.add(ProductoIngrediente(producto_id=db_producto.id, ingrediente_id=ing_id))
            
            uow._session.commit() # Aseguramos persistencia
            uow._session.refresh(db_producto)
            # Forzamos carga para la respuesta
            _ = db_producto.categorias
            _ = db_producto.ingredientes
            return db_producto

    def get_all(self, uow: UnitOfWork):
        with uow:
            productos = uow.productos.get_all()
            # Forzamos carga de relaciones para cada producto (evita que lleguen vacíos al front)
            for p in productos:
                _ = p.categorias
                _ = p.ingredientes
            return productos

    def get_by_id(self, uow: UnitOfWork, producto_id: int):
        with uow:
            producto = uow.productos.get_by_id(producto_id)
            if not producto:
                raise HTTPException(status_code=404, detail="Producto no encontrado")
            
            # 🔥 TRUCO CLAVE: Accedemos a las propiedades para que SQLAlchemy las cargue AHORA
            _ = producto.categorias
            _ = producto.ingredientes
            
            return producto

    def update_producto(self, uow: UnitOfWork, producto_id: int, producto_data: ProductoUpdate):
        with uow:
            db_producto = uow.productos.get_by_id(producto_id)
            if not db_producto:
                raise HTTPException(status_code=404, detail="Producto no encontrado")
            
            update_data = producto_data.model_dump(exclude_unset=True)
            update_data.pop("categorias_ids", None)
            update_data.pop("ingredientes_ids", None)
            
            uow.productos.update(db_producto, update_data)
            uow._session.refresh(db_producto)
            _ = db_producto.categorias
            _ = db_producto.ingredientes
            return db_producto

    def delete_producto(self, uow: UnitOfWork, producto_id: int):
        with uow:
            db_producto = uow.productos.get_by_id(producto_id)
            if not db_producto:
                raise HTTPException(status_code=404, detail="Producto no encontrado")
            uow.productos.delete(db_producto)
            return {"message": "Producto eliminado correctamente"}
