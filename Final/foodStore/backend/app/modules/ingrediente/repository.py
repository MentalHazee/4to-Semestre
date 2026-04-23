from app.core.repository import BaseRepository
from .models import Ingrediente

class IngredienteRepository(BaseRepository[Ingrediente]):
    def __init__(self, session):
        super().__init__(session, Ingrediente)
