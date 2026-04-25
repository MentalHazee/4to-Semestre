from fastapi import APIRouter, Depends, HTTPException, Query, Path
from sqlmodel import Session
from app.core.database import get_session
from app.core.unit_of_work import UnitOfWork
from .service import CategoriaService
from .schemas import CategoriaCreate, CategoriaPublic, CategoriaUpdate
from typing import List, Annotated, Optional

router = APIRouter()
service = CategoriaService()

@router.post("/", response_model=CategoriaPublic, status_code=201)
def create_categoria(data: CategoriaCreate, session: Session = Depends(get_session)):
    uow = UnitOfWork(session)
    return service.create_categoria(uow, data)

@router.get("/", response_model=List[CategoriaPublic])
def list_categorias(
    nombre: Annotated[Optional[str], Query(max_length=30, description="Filtrar categorías por nombre")] = None,
    session: Session = Depends(get_session)
):
    uow = UnitOfWork(session)
    return service.get_all(uow)

@router.put("/{id}", response_model=CategoriaPublic)
def update_categoria(
    id: Annotated[int, Path(title="El ID de la categoría a actualizar", ge=1)],
    data: CategoriaUpdate,
    session: Session = Depends(get_session)
):
    uow = UnitOfWork(session)
    return service.update_categoria(uow, id, data)

@router.delete("/{id}")
def delete_categoria(
    id: Annotated[int, Path(title="El ID de la categoría a eliminar", ge=1)],
    session: Session = Depends(get_session)
):
    uow = UnitOfWork(session)
    return service.delete_categoria(uow, id)

