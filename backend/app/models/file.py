from pydantic import BaseModel, Field
from typing import List
from datetime import datetime

class FileInfo(BaseModel):
    id: str
    name: str
    size: int
    type: str
    columns: List[str]
    row_count: int
    uploaded_at: str = Field(default_factory=lambda: datetime.now().isoformat()) 