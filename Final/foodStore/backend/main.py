from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import create_db_and_tables

# Importamos los routers
from app.modules.categoria.router import router as categoria_router
from app.modules.ingrediente.router import router as ingrediente_router
from app.modules.producto.router import router as producto_router
from app.modules.productoCategoria.router import router as prod_cat_router
from app.modules.productoIngrediente.router import router as prod_ing_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Creamos las tablas al arrancar
    create_db_and_tables()
    yield
    print("✓ Aplicación finalizada")

# DECLARACIÓN ÚNICA DE APP
app = FastAPI(
    title="FoodStore API",
    description="Backend modular con FastAPI + SQLModel",
    version="1.0.0",
    lifespan=lifespan,
)

# CONFIGURACIÓN DE CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # El puerto por defecto de Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# REGISTRO DE ROUTERS
app.include_router(categoria_router, prefix="/categorias", tags=["Categorías"])
app.include_router(ingrediente_router, prefix="/ingredientes", tags=["Ingredientes"])
app.include_router(producto_router, prefix="/productos", tags=["Productos"])
app.include_router(prod_cat_router, prefix="/productos-categorias", tags=["Relación Producto-Categoría"])
app.include_router(prod_ing_router, prefix="/productos-ingredientes", tags=["Relación Producto-Ingrediente"])

@app.get("/")
def read_root():
    return {"message": "Bienvenido a FoodStore API", "docs": "/docs"}
