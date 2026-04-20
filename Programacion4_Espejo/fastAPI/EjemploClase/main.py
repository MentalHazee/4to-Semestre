from fastapi import FastAPI
from database import create_db_and_tables
from router import hero_router
from contextlib import asynccontextmanager

app = FastAPI()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Código de inicio (startup)
    create_db_and_tables()  # Crear la base de datos y tablas al iniciar la aplicación
    yield
    # Código de finalización (shutdown)
    print("✓ Aplicación finalizada")


app = FastAPI(lifespan=lifespan)

app.include_router(hero_router)
