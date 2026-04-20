from Programacion4_Espejo.fastAPI.Ejemplo2.router import router
from fastapi import FastAPI, Depends
from database import create_db_and_tables, get_session
from sqlmodel import Session
from models import Hero
from contextlib import asynccontextmanager
from router import hero_router

app = FastAPI()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Código de inicio (startup)
    create_db_and_tables()  # Crear la base de datos y tablas al iniciar la aplicación
    yield
    # Código de finalización (shutdown)
    print("✓ Aplicación finalizada")


app = FastAPI(lifespan=lifespan)

app.include_roter(hero_router)
