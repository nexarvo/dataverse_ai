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
    
    # LLM Configuration
    llm_provider: str = "openai"  # openai, anthropic, local
    openai_api_key: Optional[str] = None
    openai_model: str = "gpt-4o-mini"
    anthropic_api_key: Optional[str] = None
    anthropic_model: str = "claude-3-haiku-20240307"
    
    # LLM Settings
    max_tokens: int = 1000
    temperature: float = 0.7
    max_sample_rows: int = 10  # Number of sample rows to send to LLM
    
    class Config:
        env_file = ".env"

settings = Settings() 