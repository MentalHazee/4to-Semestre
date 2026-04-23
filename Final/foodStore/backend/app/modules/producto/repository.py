from app.core.repository import BaseRepository
from .models import Producto

class ProductoRepository(BaseRepository[Producto]):
    def __init__(self, session):
        super().__init__(session, Producto)
