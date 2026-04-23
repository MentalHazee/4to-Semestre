# Guía de Implementación: Backend FoodStore (FastAPI + SQLModel)

Esta guía detalla los pasos para construir el backend siguiendo la arquitectura de la práctica `u_05_v2` (Router → Service → UoW → Repository).

## Fase 1: El Corazón del Sistema (Capa Core)

Antes de crear modelos de negocio, necesitamos la infraestructura genérica.

### 1.1 Repositorio Base (`app/core/repository.py`)
El `BaseRepository` maneja el CRUD básico para cualquier tabla. 
- **Misión**: El repositorio solo habla con la base de datos. No sabe nada de HTTP.
- **Métodos clave**: `get_by_id`, `get_all`, `add`, `delete`.
- *Referencia*: Mirá el archivo de la práctica en `Programacion4_Espejo/fastapi/u_05_v2/app/core/repository.py`.

### 1.2 Unit of Work (`app/core/unit_of_work.py`)
El `UnitOfWork` (UoW) gestiona la sesión y las transacciones.
- **Misión**: Garantizar que si una operación falla, se haga `rollback` automático.
- **Uso**: Se usa en los servicios mediante un contexto `with uow:`.

---

## Fase 2: Modelado de Datos (UML)

Tenés que definir tus tablas en los archivos `models.py` de cada módulo. Según el UML:

### 2.1 Relaciones Many-to-Many (N:N)
El parcial pide explícitamente relaciones complejas. Necesitás tablas de enlace:
- **`ProductoCategoria`**: Une Productos con Categorías.
- **`ProductoIngrediente`**: Une Productos con Ingredientes.

**Ejemplo de estructura para N:N:**
```python
class ProductoIngrediente(SQLModel, table=True):
    producto_id: int = Field(foreign_key="productos.id", primary_key=True)
    ingrediente_id: int = Field(foreign_key="ingredientes.id", primary_key=True)
    es_removible: bool = Field(default=False)
```

### 2.2 Relación Auto-referenciada (1:N)
En `Categoria`, una categoría puede tener un `parent_id` que apunta a otra categoría.
```python
class Categoria(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    parent_id: Optional[int] = Field(default=None, foreign_key="categorias.id")
    # ... otros campos
    parent: Optional["Categoria"] = Relationship(
        back_populates="subcategorias", 
        sa_relationship_kwargs={"remote_side": "Categoria.id"}
    )
    subcategorias: List["Categoria"] = Relationship(back_populates="parent")
```

---

## Fase 3: Desarrollo de un Módulo (Receta)

Para cada módulo (Categoria, Producto, Ingrediente), seguí este orden:

1.  **`models.py`**: Definís la tabla real de la DB.
2.  **`schemas.py`**: Definís los modelos de Pydantic para entrada/salida. 
    - `ClaseCreate`: Lo que recibís por POST (sin ID).
    - `ClasePublic`: Lo que devolvés (con ID y sin datos sensibles).
    - `ClaseUpdate`: Lo que recibís por PATCH (campos opcionales).
3.  **`repository.py`**: Creás la clase heredando de `BaseRepository`.
4.  **`service.py`**:
    - Recibe el `UnitOfWork`.
    - Contiene la lógica de negocio (ej: "No se puede borrar una categoría si tiene productos").
    - Lanza `HTTPException` si algo no cuadra.
5.  **`router.py`**:
    - Definís los `@router.get`, `@router.post`, etc.
    - Usás `Annotated[int, Path(...)]` o `Annotated[str, Query(...)]` para validaciones como pide el PDF.

---

## Fase 4: Conexión Final

En tu `main.py`:
1.  Importá los routers de cada módulo.
2.  Usá `app.include_router(categoria.router, prefix="/categorias", tags=["Categorias"])`.
3.  Asegurate de que el `lifespan` llame a `create_db_and_tables()` para que SQLModel cree todo en Postgres al arrancar.

## Referencia de Código (Para copiar y adaptar)

### A. Capa Core (Cimientos)

#### 1. `app/core/repository.py`
```python
from typing import Generic, TypeVar, Type, Sequence, Optional
from sqlmodel import Session, SQLModel, select

ModelT = TypeVar("ModelT", bound=SQLModel)

class BaseRepository(Generic[ModelT]):
    def __init__(self, session: Session, model: Type[ModelT]) -> None:
        self.session = session
        self.model = model

    def get_by_id(self, record_id: int) -> Optional[ModelT]:
        return self.session.get(self.model, record_id)

    def get_all(self, offset: int = 0, limit: int = 20) -> Sequence[ModelT]:
        return self.session.exec(select(self.model).offset(offset).limit(limit)).all()

    def add(self, instance: ModelT) -> ModelT:
        self.session.add(instance)
        self.session.flush()
        self.session.refresh(instance)
        return instance

    def delete(self, instance: ModelT) -> None:
        self.session.delete(instance)
        self.session.flush()
```

#### 2. `app/core/unit_of_work.py`
```python
from sqlmodel import Session
from app.modules.categoria.repository import CategoriaRepository
# Importar otros repositorios aquí...

class UnitOfWork:
    def __init__(self, session: Session) -> None:
        self._session = session
        # Inicializar repositorios
        self.categorias = CategoriaRepository(session)
        # self.productos = ProductoRepository(session)

    def __enter__(self) -> "UnitOfWork":
        return self

    def __exit__(self, exc_type, exc_val, exc_tb) -> None:
        if exc_type is None:
            self._session.commit()
        else:
            self._session.rollback()
```

---

### B. Módulo Ejemplo: Categoría

#### 1. `app/modules/categoria/models.py`
```python
from typing import Optional, List, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from app.modules.producto.models import Producto

class Categoria(SQLModel, table=True):
    __tablename__ = "categorias"

    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str = Field(index=True, unique=True, max_length=100)
    descripcion: Optional[str] = None
    imagen_url: Optional[str] = None
    parent_id: Optional[int] = Field(default=None, foreign_key="categorias.id")

    # Relación auto-referenciada (Jerarquía)
    parent: Optional["Categoria"] = Relationship(
        back_populates="subcategorias",
        sa_relationship_kwargs={"remote_side": "Categoria.id"}
    )
    subcategorias: List["Categoria"] = Relationship(back_populates="parent")

    # Relación N:N con Producto (a través de la tabla de enlace)
    productos: List["Producto"] = Relationship(
        back_populates="categorias", 
        link_model=None # Aquí iría tu tabla ProductoCategoria
    )
```

#### 2. `app/modules/categoria/schemas.py`
```python
from typing import Optional
from pydantic import BaseModel

class CategoriaBase(BaseModel):
    nombre: str
    descripcion: Optional[str] = None
    imagen_url: Optional[str] = None
    parent_id: Optional[int] = None

class CategoriaCreate(CategoriaBase):
    pass

class CategoriaPublic(CategoriaBase):
    id: int

class CategoriaUpdate(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    parent_id: Optional[int] = None
```

#### 3. `app/modules/categoria/service.py`
```python
from fastapi import HTTPException
from app.core.unit_of_work import UnitOfWork
from .schemas import CategoriaCreate

class CategoriaService:
    def create_categoria(self, uow: UnitOfWork, categoria_data: CategoriaCreate):
        with uow:
            # Lógica de negocio (ej: validar que no exista el nombre)
            new_cat = uow.categorias.add_from_schema(categoria_data)
            return new_cat

    def get_all(self, uow: UnitOfWork):
        with uow:
            return uow.categorias.get_all()
```

---

## 🚀 Próximos Pasos para vos:
1.  **Copiá** el código de `repository.py` y `unit_of_work.py` a sus respectivos archivos en `app/core/`.
2.  **Definí** tu tabla de enlace `ProductoCategoria` para que las relaciones N:N funcionen.
3.  **Registrá** el router en `main.py`.

¡Dale con todo, loco! Si te trabás en algún paso específico, avisame.


