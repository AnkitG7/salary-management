from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings
from app.models import Base


# Create SQLAlchemy engine using database URL from settings
engine = create_engine(
    settings.database_url,
    echo=False,
)

# Create all database tables defined in models
Base.metadata.create_all(bind=engine)

# Configure database session factory
SessionLocal = sessionmaker(
    autoflush=False,
    autocommit=False,
    bind=engine,
)

# Dependency function to provide database session
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        # Close database session after request completes
        db.close()
