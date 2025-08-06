import pandas as pd
from typing import List, Dict, Any
import json
import re
from .question_generator import question_generator

class LLMService:
    """Service responsible for data analysis and coordinating question generation"""
    
    def __init__(self):
        # Hard-coded categories for question suggestions
        self.categories = {
            "learn": {
                "name": "Learn",
                "description": "Understand your data structure and basic insights",
                "icon": "📚"
            },
            "explore": {
                "name": "Explore", 
                "description": "Discover patterns and relationships in your data",
                "icon": "🔍"
            },
            "business": {
                "name": "Business",
                "description": "Get actionable business insights and recommendations",
                "icon": "💼"
            },
            "visualize": {
                "name": "Visualize",
                "description": "Create charts and visual representations",
                "icon": "📊"
            }
        }

    def analyze_data_structure(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Analyze the structure of the uploaded data"""
        analysis = {
            "total_rows": len(df),
            "total_columns": len(df.columns),
            "column_types": {},
            "numeric_columns": [],
            "categorical_columns": [],
            "date_columns": [],
            "sample_data": df.head(3).to_dict('records'),
            "column_descriptions": {}
        }

        for col in df.columns:
            col_type = str(df[col].dtype)
            analysis["column_types"][col] = col_type
            
            # Categorize columns
            if pd.api.types.is_numeric_dtype(df[col]):
                analysis["numeric_columns"].append(col)
            elif pd.api.types.is_datetime64_any_dtype(df[col]):
                analysis["date_columns"].append(col)
            else:
                analysis["categorical_columns"].append(col)

        return analysis

    def generate_questions_for_category(self, category: str, data_analysis: Dict[str, Any]) -> List[Dict[str, str]]:
        """Generate questions for a specific category using the question generator"""
        
        # Get sample data for question generation
        sample_data = data_analysis.get("sample_data", [])
        
        # Delegate question generation to the dedicated service
        return question_generator.generate_questions(category, data_analysis, sample_data)

    def get_categories(self) -> Dict[str, Any]:
        """Get all available categories"""
        return self.categories

    def get_questions_for_category(self, category: str, df: pd.DataFrame) -> Dict[str, Any]:
        """Get questions for a specific category"""
        if category not in self.categories:
            raise ValueError(f"Unknown category: {category}")
        
        # Analyze the data
        analysis = self.analyze_data_structure(df)
        
        # Generate questions using the question generator
        questions = self.generate_questions_for_category(category, analysis)
        
        return {
            "category": self.categories[category],
            "questions": questions,
            "data_analysis": analysis
        }

# Global instance
llm_service = LLMService() 