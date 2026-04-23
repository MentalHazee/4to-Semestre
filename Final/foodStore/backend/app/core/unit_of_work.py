from sqlmodel import Session
from app.modules.categoria.repository import CategoriaRepository
from app.modules.ingrediente.repository import IngredienteRepository
from app.modules.producto.repository import ProductoRepository
from app.modules.productoCategoria.repository import ProductoCategoriaRepository
from app.modules.productoIngrediente.repository import ProductoIngredienteRepository

class UnitOfWork:
    def __init__(self, session: Session) -> None:
        self._session = session
        # Registro masivo de repositorios
        self.categorias = CategoriaRepository(session)
        self.ingredientes = IngredienteRepository(session)
        self.productos = ProductoRepository(session)
        self.productos_categorias = ProductoCategoriaRepository(session)
        self.productos_ingredientes = ProductoIngredienteRepository(session)

    def __enter__(self) -> "UnitOfWork":
        return self

    def __exit__(self, exc_type, exc_val, exc_tb) -> None:
        if exc_type is None:
            self._session.commit()
        else:
            self._session.rollback()
