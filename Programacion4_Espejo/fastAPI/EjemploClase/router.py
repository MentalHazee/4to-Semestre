from fastapi import APIRouter, Depends, HTTPException
from schema import HeroCreate, HeroRead, HeroUpdate
from sqlmodel import Session
from service import create_hero, get_hero_by_id, list_heroes, uptade_hero, delete_hero
from database import get_session

hero_router = APIRouter(prefix="/hero", tags=["heroes"])


@hero_router.post("/", response_model=HeroRead)
def create(hero: HeroCreate, session: Session = Depends(get_session)):
    return create_hero(session, hero)


@hero_router.get("/{hero_id}", response_model=HeroRead)
def get_by_id(hero_id: int, session: Session = Depends(get_session)):
    try:
        return get_hero_by_id(session, hero_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@hero_router.get("/")
def get_all(session: Session = Depends(get_session)):
    return list_heroes(session)


@hero_router.patch("/{hero_id}", response_model=HeroRead)
def update(hero_id: int, data: HeroUpdate, session: Session = Depends(get_session)):
    try:
        return uptade_hero(session, hero_id, data)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@hero_router.delete("/{hero_id}")
def delete(hero_id: int, session: Session = Depends(get_session)):
    delete_hero(session, hero_id)
