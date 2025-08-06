from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import pandas as pd
import io
import uuid
from typing import Dict, Any
from ..models.file import FileInfo

router = APIRouter()

# In-memory storage for demo (replace with database in production)
file_storage: Dict[str, pd.DataFrame] = {}

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)) -> JSONResponse:
    """
    Upload a CSV or Excel file for analysis
    """
    try:
        # Validate file type
        if not file.filename.lower().endswith(('.csv', '.xlsx', '.xls')):
            raise HTTPException(
                status_code=400, 
                detail="Only CSV and Excel files are supported"
            )
        
        # Read file content
        content = await file.read()
        
        # Parse based on file type
        if file.filename.lower().endswith('.csv'):
            df = pd.read_csv(io.StringIO(content.decode('utf-8')))
        else:
            df = pd.read_excel(io.BytesIO(content))
        
        # Generate unique file ID
        file_id = str(uuid.uuid4())
        
        # Store in memory (replace with database in production)
        file_storage[file_id] = df
        
        # Create file info
        file_info = FileInfo(
            id=file_id,
            name=file.filename,
            size=len(content),
            type=file.content_type or "application/octet-stream",
            columns=df.columns.tolist(),
            row_count=len(df)
        )
        
        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "data": file_info.dict()
            }
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"File upload failed: {str(e)}"
        )

@router.get("/files/{file_id}")
async def get_file_info(file_id: str) -> JSONResponse:
    """
    Get information about an uploaded file
    """
    if file_id not in file_storage:
        raise HTTPException(status_code=404, detail="File not found")
    
    df = file_storage[file_id]
    
    file_info = FileInfo(
        id=file_id,
        name=f"file_{file_id[:8]}.csv",
        size=0,  # Would be stored in database
        type="text/csv",
        columns=df.columns.tolist(),
        row_count=len(df)
    )
    
    return JSONResponse(
        status_code=200,
        content={
            "success": True,
            "data": file_info.dict()
        }
    ) 