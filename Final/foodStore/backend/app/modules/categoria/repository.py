from app.core.repository import BaseRepository
from .models import Categoria

class CategoriaRepository(BaseRepository[Categoria]):
    def __init__(self, session):
        super().__init__(session, Categoria)
