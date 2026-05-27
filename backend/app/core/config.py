from pydantic_settings import BaseSettings
from pydantic_settings import SettingsConfigDict


# Application settings loaded from environment variables
class Settings(BaseSettings):
    database_url: str

    # Load environment variables from .env file
    model_config = SettingsConfigDict(
        env_file=".env"
    )


# Create settings instance for application-wide use
settings = Settings()
