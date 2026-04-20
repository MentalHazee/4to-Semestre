from sqlmodel import SQLModel

class HeroCreate(SQLModel):
    name:str
    email:str

class HeroRead(SQLModel):
    id:int
    name:str
    email:str

class HeroUpdate(SQLModel):
    email:str