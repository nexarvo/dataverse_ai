from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Dict, Any, List, Optional
import pandas as pd
from ..api.upload import file_storage
import uuid
from datetime import datetime

router = APIRouter()

class AnalysisRequest(BaseModel):
    file_id: str
    question: str

class AnalysisResponse(BaseModel):
    id: str
    question: str
    answer: str
    data: List[Dict[str, Any]]
    chart: Optional[Dict[str, Any]] = None
    created_at: datetime

@router.post("/analyze")
async def analyze_data(request: AnalysisRequest) -> JSONResponse:
    """
    Analyze data based on a natural language question
    """
    try:
        # Check if file exists
        if request.file_id not in file_storage:
            raise HTTPException(status_code=404, detail="File not found")
        
        df = file_storage[request.file_id]
        
        # Simple analysis based on question keywords
        question_lower = request.question.lower()
        
        # Mock analysis logic (replace with actual AI/ML analysis)
        if "top" in question_lower and "5" in question_lower:
            # Show top 5 rows
            result_data = df.head(5).to_dict('records')
            answer = f"Here are the top 5 rows from your {len(df)} row dataset."
            chart_type = "table"
            
        elif "average" in question_lower or "mean" in question_lower:
            # Calculate averages for numeric columns
            numeric_cols = df.select_dtypes(include=['number']).columns
            if len(numeric_cols) > 0:
                averages = df[numeric_cols].mean().to_dict()
                result_data = [{"column": k, "average": round(v, 2)} for k, v in averages.items()]
                answer = f"Here are the averages for numeric columns in your dataset."
                chart_type = "bar"
            else:
                result_data = []
                answer = "No numeric columns found for averaging."
                chart_type = None
                
        elif "count" in question_lower or "total" in question_lower:
            # Count rows
            result_data = [{"total_rows": len(df)}]
            answer = f"Your dataset contains {len(df)} rows."
            chart_type = None
            
        else:
            # Default: show first few rows
            result_data = df.head(10).to_dict('records')
            answer = f"Here are the first 10 rows from your dataset with {len(df.columns)} columns."
            chart_type = "table"
        
        # Create chart data if applicable
        chart_data = None
        if chart_type == "bar" and result_data:
            chart_data = {
                "type": "bar",
                "data": {
                    "labels": [item.get("column", "") for item in result_data],
                    "datasets": [{
                        "label": "Average Values",
                        "data": [item.get("average", 0) for item in result_data],
                        "backgroundColor": ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]
                    }]
                },
                "options": {
                    "responsive": True,
                    "plugins": {
                        "legend": {"position": "top"},
                        "title": {"display": True, "text": "Analysis Results"}
                    }
                }
            }
        
        analysis_result = AnalysisResponse(
            id=str(uuid.uuid4()),
            question=request.question,
            answer=answer,
            data=result_data,
            chart=chart_data,
            created_at=datetime.now()
        )
        
        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "data": analysis_result.dict()
            }
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}"
        ) 