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
                uow.productos_categorias.add(
                    ProductoCategoria(producto_id=db_producto.id, categoria_id=cat_id)
                )
            for ing_id in ingredientes_ids:
                uow.productos_ingredientes.add(
                    ProductoIngrediente(
                        producto_id=db_producto.id, ingrediente_id=ing_id
                    )
                )

            uow._session.commit()  # Aseguramos persistencia
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

            # Accedemos a las propiedades para que SQLAlchemy las cargue AHORA
            _ = producto.categorias
            _ = producto.ingredientes

            return producto

    def update_producto(
        self, uow: UnitOfWork, producto_id: int, producto_data: ProductoUpdate
    ):
        with uow:
            db_producto = uow.productos.get_by_id(producto_id)
            if not db_producto:
                raise HTTPException(status_code=404, detail="Producto no encontrado")

            # Separamos los IDs de relaciones del resto de la data
            update_data = producto_data.model_dump(exclude_unset=True)
            categorias_ids = update_data.pop("categorias_ids", None)
            ingredientes_ids = update_data.pop("ingredientes_ids", None)

            # Actualizamos los campos básicos (nombre, precio, etc.)
            uow.productos.update(db_producto, update_data)
            uow._session.flush()

            # --- Sincronizar Categorías ---
            if categorias_ids is not None:
                # Borramos las que ya tiene
                stmt_cat = select(ProductoCategoria).where(ProductoCategoria.producto_id == producto_id)
                res_cat = uow._session.exec(stmt_cat).all()
                for r in res_cat:
                    uow._session.delete(r)
                uow._session.flush()
                # Agregamos las nuevas
                for cat_id in categorias_ids:
                    uow.productos_categorias.add(
                        ProductoCategoria(producto_id=producto_id, categoria_id=cat_id)
                    )

            # --- Sincronizar Ingredientes ---
            if ingredientes_ids is not None:
                # Borramos los que ya tiene
                stmt_ing = select(ProductoIngrediente).where(ProductoIngrediente.producto_id == producto_id)
                res_ing = uow._session.exec(stmt_ing).all()
                for r in res_ing:
                    uow._session.delete(r)
                uow._session.flush()
                # Agregamos los nuevos
                for ing_id in ingredientes_ids:
                    uow.productos_ingredientes.add(
                        ProductoIngrediente(producto_id=producto_id, ingrediente_id=ing_id)
                    )

            uow._session.commit()
            uow._session.refresh(db_producto)
            
            # Forzamos carga para que el front reciba todo actualizado
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
