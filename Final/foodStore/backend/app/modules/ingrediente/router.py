from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from app.core.database import get_session
from app.core.unit_of_work import UnitOfWork
from .service import IngredienteService
from .schemas import IngredienteCreate, IngredientePublic, IngredienteUpdate
from typing import List

router = APIRouter()
service = IngredienteService()

@router.post("/", response_model=IngredientePublic, status_code=201)
def create_ingrediente(data: IngredienteCreate, session: Session = Depends(get_session)):
    uow = UnitOfWork(session)
    return service.create_ingrediente(uow, data)

@router.get("/", response_model=List[IngredientePublic])
def list_ingredientes(session: Session = Depends(get_session)):
    uow = UnitOfWork(session)
    return service.get_all(uow)

@router.put("/{id}", response_model=IngredientePublic)
def update_ingrediente(id: int, data: IngredienteUpdate, session: Session = Depends(get_session)):
    uow = UnitOfWork(session)
    return service.update_ingrediente(uow, id, data)

@router.delete("/{id}")
def delete_ingrediente(id: int, session: Session = Depends(get_session)):
    uow = UnitOfWork(session)
    return service.delete_ingrediente(uow, id)
