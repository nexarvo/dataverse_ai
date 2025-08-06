from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    app_name: str = "Dataverse.ai"
    debug: bool = True
    api_prefix: str = "/api/v1"
    
    # CORS settings
    allowed_origins: list = ["http://localhost:3000"]
    
    # File upload settings
    max_file_size: int = 50 * 1024 * 1024  # 50MB
    allowed_file_types: list = [".csv", ".xlsx", ".xls"]
    
    class Config:
        env_file = ".env"

settings = Settings() 