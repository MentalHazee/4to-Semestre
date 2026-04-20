# Importamos herramientas de SQLModel:
# create_engine: crea la conexión a la base de datos
# SQLModel: base para los modelos (tablas)
# Session: maneja las transacciones con la BD
from sqlmodel import create_engine, SQLModel, Session


# URL de conexión a PostgreSQL
# Formato: postgresql://usuario:password@host:puerto/nombre_db
DATABASE_URL = "postgresql://postgres:1234@localhost:5432/mydb"


# Creamos el "engine", que es el núcleo de conexión con la base de datos
# echo=True → muestra en consola todas las queries SQL (muy útil para debug)
engine = create_engine(DATABASE_URL, echo=True)


# =========================
# CREAR TABLAS
# =========================
def create_db_and_tables():
    # Crea todas las tablas definidas en los modelos que heredan de SQLModel
    # Si ya existen, no las vuelve a crear
    SQLModel.metadata.create_all(engine)


# =========================
# SESIÓN DE BASE DE DATOS
# =========================
def get_session():
    # Creamos una sesión de base de datos
    # Se usa "with" para que se cierre automáticamente
    with Session(engine) as session:
        # yield se usa en FastAPI para inyectar dependencias
        # → entrega la sesión al endpoint
        yield session

        # Cuando termina el request, la sesión se cierra sola
