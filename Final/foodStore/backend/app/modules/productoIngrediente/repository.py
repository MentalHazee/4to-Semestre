from app.core.repository import BaseRepository
from .models import ProductoIngrediente

class ProductoIngredienteRepository(BaseRepository[ProductoIngrediente]):
    def __init__(self, session):
        super().__init__(session, ProductoIngrediente)
