from fastapi import APIRouter, Depends
from sqlmodel import Session
from app.core.database import get_session
from app.core.unit_of_work import UnitOfWork
from .service import ProductoIngredienteService
from .schemas import ProductoIngredienteCreate
from typing import List

router = APIRouter()
service = ProductoIngredienteService()

@router.post("/", status_code=201)
def associate_producto_ingrediente(data: ProductoIngredienteCreate, session: Session = Depends(get_session)):
    uow = UnitOfWork(session)
    return service.associate(uow, data)

@router.get("/")
def list_associations(session: Session = Depends(get_session)):
    uow = UnitOfWork(session)
    return service.get_all(uow)
