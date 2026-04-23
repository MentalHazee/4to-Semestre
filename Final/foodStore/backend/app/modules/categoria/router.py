from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from app.core.database import get_session
from app.core.unit_of_work import UnitOfWork
from .service import CategoriaService
from .schemas import CategoriaCreate, CategoriaPublic, CategoriaUpdate
from typing import List

router = APIRouter()
service = CategoriaService()

@router.post("/", response_model=CategoriaPublic, status_code=201)
def create_categoria(data: CategoriaCreate, session: Session = Depends(get_session)):
    uow = UnitOfWork(session)
    return service.create_categoria(uow, data)

@router.get("/", response_model=List[CategoriaPublic])
def list_categorias(session: Session = Depends(get_session)):
    uow = UnitOfWork(session)
    return service.get_all(uow)

@router.put("/{id}", response_model=CategoriaPublic)
def update_categoria(id: int, data: CategoriaUpdate, session: Session = Depends(get_session)):
    uow = UnitOfWork(session)
    # Necesitamos agregar este método al servicio
    return service.update_categoria(uow, id, data)

@router.delete("/{id}")
def delete_categoria(id: int, session: Session = Depends(get_session)):
    uow = UnitOfWork(session)
    # Necesitamos agregar este método al servicio
    return service.delete_categoria(uow, id)
