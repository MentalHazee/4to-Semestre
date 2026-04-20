"""
===========================================================
📌 EXPLICACIÓN GENERAL DE FASTAPI
===========================================================

FastAPI es un framework moderno de Python para crear APIs de forma rápida y eficiente.

Conceptos clave que aparecen en este código:

- 🔹 Rutas (endpoints):
  Son las URLs que definimos (ej: "/items/{item_id}") donde el cliente puede hacer requests.

- 🔹 Métodos HTTP:
  GET → obtener datos
  POST → enviar datos

- 🔹 Parámetros:
  - Path → vienen en la URL (ej: /items/5)
  - Query → vienen en la URL pero como query (?skip=10)
  - Body → vienen en el cuerpo (JSON)

- 🔹 Pydantic:
  Se usa para definir modelos de datos y validar automáticamente lo que llega.

- 🔹 Annotated:
  Permite agregar validaciones y metadata a los parámetros (ej: mínimo, máximo, etc).

Este archivo define una API con múltiples endpoints, validaciones y manejo de datos.
===========================================================
"""

from typing import Annotated
from fastapi import FastAPI, Path, Query
from pydantic import BaseModel

# Se crea la instancia principal de la aplicación
app = FastAPI()


# ==============================
# ENDPOINTS BÁSICOS
# ==============================

@app.get("/")
def root():

    """
    Endpoint raíz.
    Se accede en: http://localhost:8000/
    """

    return {
        "message": "Hola mundo (mensaje de prueba)"
    }


@app.get("/items/{item_id}")
def read_item(item_id: int):

    """
    Parámetro de tipo PATH.
    Recibe el item_id directamente desde la URL.
    Ej: /items/5
    """

    return {"item_id": item_id}


@app.get("/users/me")
def get_me():

    """
    Endpoint fijo.
    Siempre devuelve el usuario actual.
    """

    return {"user": "current"}


@app.get("/users/{user_id}")
def get_user(user_id: str):

    """
    Endpoint dinámico.
    Recibe cualquier user_id como string.
    """

    return {"user_id": user_id}


# ==============================
# VALIDACIONES CON ANNOTATED
# ==============================

@app.get("/items/{item_id}")
def get_item(
    # Path con validación: debe ser >= 1
    item_id: Annotated[int, Path(title="ID del item", ge=1)],

    # Query opcional con validaciones de longitud
    q: Annotated[str | None, Query(min_length=3, max_length=50)] = None,):

    """
    Ejemplo de uso de Annotated:
    - Validaciones automáticas
    - Metadata para documentación (Swagger)
    """

    return {"item_id": item_id, "q": q}


# ==============================
# QUERY PARAMETERS
# ==============================

@app.get("/items/")
def list_items(skip: int, limit: int):

    """
    Parámetros de tipo QUERY (obligatorios).
    Ej: /items/?skip=0&limit=10
    """
    
    return {"skip": skip, "limit": limit}


@app.get("/item/")
def list_products(
    skip: int = 0,
    limit: int = 10,
    active: bool = True,):

    """
    Parámetros QUERY con valores por defecto.
    Si no se envían, se usan esos valores.
    """

    return {"skip": skip, "limit": limit, "active": active}


# ==============================
# MODELOS CON PYDANTIC (BODY)
# ==============================

class Item(BaseModel):

    """
    Modelo de datos para validar el body del request.
    FastAPI automáticamente:
    - Valida tipos
    - Genera documentación
    - Convierte JSON a objeto Python
    """

    nombre: str
    descripcion: str | None = None
    precio: float
    impuesto: float | None = None


@app.post("/items/")
def create_item(item: Item):

    """
    Recibe un objeto JSON en el body y lo convierte en Item.
    """
    
    return item


@app.post("/item/dic")
def create_item_dic(item: Item):

    """
    Convierte el objeto a diccionario y agrega lógica extra.
    """
    
    # Convierte el modelo a diccionario
    item_dic = item.model_dump()

    # Si hay impuesto, calcula el precio final
    if item.impuesto is not None:
        precio_con_impuesto = item.precio + item.impuesto

        # Agrega el nuevo campo al diccionario
        item_dic.update(
            {
                "precio_con_impuesto": precio_con_impuesto
            }
        )

    return item_dic

