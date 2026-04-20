# Importamos herramientas de SQLModel:
# Session: para interactuar con la base de datos
# select: para hacer consultas tipo SELECT
from sqlmodel import Session, select

# Importamos el modelo de la base de datos
from models import Hero

# Importamos los esquemas (DTOs) que usamos para crear y actualizar
from schema import HeroCreate, HeroUpdate


# =========================
# CREATE
# =========================
def create_hero(session: Session, data: HeroCreate) -> Hero:
    # Convertimos los datos recibidos (HeroCreate)
    # en una instancia del modelo Hero (tabla de BD)
    hero = Hero.model_validate(data)

    # Agregamos el objeto a la sesión (todavía no se guarda en BD)
    session.add(hero)

    # Ejecutamos la transacción (INSERT en la base de datos)
    session.commit()

    # Refrescamos el objeto para obtener datos actualizados
    # (por ejemplo el id generado por la BD)
    session.refresh(hero)

    # Devolvemos el héroe creado
    return hero


# =========================
# READ (por ID)
# =========================
def get_hero_by_id(session: Session, hero_id: int) -> Hero:
    # Buscamos el héroe por su clave primaria (id)
    hero = session.get(Hero, hero_id)

    # Si no existe, lanzamos un error
    if not hero:
        raise ValueError("Hero no encontrado")

    # Si existe, lo devolvemos
    return hero


# =========================
# READ (listar todos)
# =========================
def list_heroes(session: Session):
    # Creamos una consulta SELECT * FROM hero
    statement = select(Hero)

    # Ejecutamos la consulta
    result = session.exec(statement)

    # Obtenemos todos los resultados como lista
    heroes = result.all()

    return heroes


# =========================
# UPDATE
# =========================
def uptade_hero(session: Session, hero_id: int, update: HeroUpdate):
    # Buscamos el héroe en la base de datos
    hero = session.get(Hero, hero_id)

    # Si no existe, error
    if not hero:
        raise ValueError("No se encontro el heroe")

    # Convertimos el objeto de actualización a diccionario
    # exclude_unset=True → solo incluye los campos enviados
    update_data = update.model_dump(exclude_unset=True)

    # Recorremos cada campo a actualizar
    for field, value in update_data.items():
        # setattr permite modificar dinámicamente atributos del objeto
        setattr(hero, field, value)

    # Guardamos cambios
    session.add(hero)
    session.commit()
    session.refresh(hero)

    # Retornamos el héroe actualizado
    return hero


# =========================
# DELETE (lógico)
# =========================
def delete_hero(session: Session, hero_id: int):
    # Buscamos el héroe
    hero = session.get(Hero, hero_id)

    # Si no existe, error
    if not hero:
        raise ValueError("Hero no encontrado")

    # En vez de eliminarlo físicamente (DELETE),
    # hacemos un borrado lógico
    # → marcamos el campo is_active como False
    hero.is_active = False

    # Guardamos cambios
    session.add(hero)
    session.commit()
    session.refresh(hero)
