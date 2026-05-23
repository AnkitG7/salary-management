from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings
from app.models import Base




engine = create_engine(
    settings.database_url,
    echo=False,
)

Base.metadata.create_all(bind=engine)

SessionLocal = sessionmaker(
    autoflush=False,
    autocommit=False,
    bind=engine,
)

def get_db():
    db = SessionLocal()

    try :
        yield db
    finally:
        db.close()
