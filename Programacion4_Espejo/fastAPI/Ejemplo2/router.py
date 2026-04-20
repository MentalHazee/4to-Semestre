from fastapi import APIRouter
from models import HeroCreate, HeroRead
from sqlmodel import Session
from service import create_hero
from database import get_session

hero_router = APIRouter(prefix="/hero", tags=["heroes"])


@hero_router.post("/")
def create_hero(hero: HeroCreate, session: Session = Depends(get_session)):
    return create_hero(session, hero)
