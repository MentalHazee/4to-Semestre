from sqlmodel import Session
from models import Hero
from schema import HeroCreate


def create_hero(session: Session, data: HeroCreate) -> Hero:
    hero = Hero.model_validate(data)

    session.add(hero)
    session.commit()
    session.refresh(hero)

    return hero
