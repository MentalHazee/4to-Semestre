from fastapi import APIRouter, Depends, HTTPException, Query, Path
from sqlmodel import Session
from app.core.database import get_session
from app.core.unit_of_work import UnitOfWork
from .service import ProductoService
from .schemas import ProductoCreate, ProductoPublic, ProductoUpdate
from typing import List, Annotated, Optional

router = APIRouter()
service = ProductoService()

@router.post("/", response_model=ProductoPublic, status_code=201)
def create_producto(data: ProductoCreate, session: Session = Depends(get_session)):
    uow = UnitOfWork(session)
    return service.create_producto(uow, data)

@router.get("/", response_model=List[ProductoPublic])
def list_productos(
    nombre: Annotated[Optional[str], Query(max_length=50, description="Filtrar por nombre")] = None,
    session: Session = Depends(get_session)
):
    uow = UnitOfWork(session)
    return service.get_all(uow)

@router.get("/{id}", response_model=ProductoPublic)
def get_producto(
    id: Annotated[int, Path(title="El ID del producto a obtener", ge=1)],
    session: Session = Depends(get_session)
):
    uow = UnitOfWork(session)
    return service.get_by_id(uow, id)

@router.put("/{id}", response_model=ProductoPublic)
def update_producto(
    id: Annotated[int, Path(title="El ID del producto a actualizar", ge=1)],
    data: ProductoUpdate,
    session: Session = Depends(get_session)
):
    uow = UnitOfWork(session)
    return service.update_producto(uow, id, data)

@router.delete("/{id}")
def delete_producto(
    id: Annotated[int, Path(title="El ID del producto a eliminar", ge=1)],
    session: Session = Depends(get_session)
):
    uow = UnitOfWork(session)
    return service.delete_producto(uow, id)

