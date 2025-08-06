from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Dict, Any
import pandas as pd
from ..api.upload import file_storage
from ..services.llm_service import llm_service

router = APIRouter()

class SuggestionRequest(BaseModel):
    file_id: str
    category: str = "learn"  # Default category

class QuestionSuggestion(BaseModel):
    question: str
    description: str

class CategoryInfo(BaseModel):
    name: str
    description: str
    icon: str

class SuggestionsResponse(BaseModel):
    category: CategoryInfo
    questions: List[QuestionSuggestion]
    data_analysis: Dict[str, Any]

@router.get("/categories")
async def get_categories() -> JSONResponse:
    """Get all available question categories"""
    try:
        categories = llm_service.get_categories()
        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "data": categories
            }
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get categories: {str(e)}"
        )

@router.post("/suggestions")
async def get_suggestions(request: SuggestionRequest) -> JSONResponse:
    """Get question suggestions for a specific category"""
    try:
        # Check if file exists
        if request.file_id not in file_storage:
            raise HTTPException(status_code=404, detail="File not found")
        
        df = file_storage[request.file_id]
        
        # Get suggestions from LLM service
        result = llm_service.get_questions_for_category(request.category, df)
        
        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "data": result
            }
        )
        
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid category: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate suggestions: {str(e)}"
        )

@router.get("/suggestions/{file_id}")
async def get_default_suggestions(file_id: str) -> JSONResponse:
    """Get default suggestions (learn category) for a file"""
    try:
        # Check if file exists
        if file_id not in file_storage:
            raise HTTPException(status_code=404, detail="File not found")
        
        df = file_storage[file_id]
        
        # Get default suggestions (learn category)
        result = llm_service.get_questions_for_category("learn", df)
        
        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "data": result
            }
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate suggestions: {str(e)}"
        ) 