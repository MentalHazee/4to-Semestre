from app.core.repository import BaseRepository
from .models import ProductoCategoria

class ProductoCategoriaRepository(BaseRepository[ProductoCategoria]):
    def __init__(self, session):
        super().__init__(session, ProductoCategoria)
