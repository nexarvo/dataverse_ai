import json
from typing import Dict, Any, List
from .llm_client import llm_client

class QuestionGenerator:
    """Service responsible for generating questions based on data analysis"""
    
    def __init__(self):
        self.category_info = {
            "learn": {
                "description": "Generate questions to help understand the data structure and basic insights of the data",
                "focus": "data structure, basic statistics, column types, data overview"
            },
            "explore": {
                "description": "Generate questions to discover patterns and relationships in the data",
                "focus": "trends, correlations, patterns, outliers, data exploration"
            },
            "business": {
                "description": "Generate questions to extract actionable business insights and recommendations",
                "focus": "KPIs, business metrics, performance analysis, actionable insights"
            },
            "visualize": {
                "description": "Generate questions to create charts and visual representations of the data",
                "focus": "charts, graphs, dashboards, visualizations, data presentation"
            }
        }
    
    def generate_questions(self, category: str, data_analysis: Dict[str, Any], sample_data: List[Dict]) -> List[Dict[str, str]]:
        """Generate questions for a specific category using LLM"""
        
        try:
            prompt = self._build_prompt(category, data_analysis, sample_data)
            llm_response = llm_client.generate_text(prompt)
            return self._parse_llm_response(llm_response)
            
        except Exception as e:
            print(f"Question generation failed: {e}")
            return self._get_fallback_questions(category, data_analysis)
    
    def _build_prompt(self, category: str, data_analysis: Dict[str, Any], sample_data: List[Dict]) -> str:
        """Build a comprehensive prompt for the LLM"""
        
        cat_info = self.category_info.get(category, self.category_info["learn"])
        
        prompt = f"""
You are a data analysis assistant. Based on the following dataset information, generate 5-7 relevant questions for the "{category}" category.

Category: {category}
Focus: {cat_info['focus']}
Description: {cat_info['description']}

Dataset Information:
- Total Rows: {data_analysis.get('total_rows', 0)}
- Total Columns: {data_analysis.get('total_columns', 0)}
- Column Names: {list(data_analysis.get('column_types', {}).keys())}
- Numeric Columns: {data_analysis.get('numeric_columns', [])}
- Categorical Columns: {data_analysis.get('categorical_columns', [])}
- Date Columns: {data_analysis.get('date_columns', [])}

Sample Data (first {len(sample_data)} rows):
{json.dumps(sample_data, indent=2)}

Instructions:
1. Generate 5 specific, actionable questions for the {category} category
2. Questions should be relevant to the actual data structure and content
3. Make questions specific to the columns and data types present
4. Focus on {cat_info['focus']}
5. Return ONLY a valid JSON array with "question" and "description" fields
6. Do not include any markdown formatting or code blocks
7. Ensure the JSON is properly formatted

Return the questions as a JSON array like this:
[
  {{
    "question": "What is the average value of [specific_column]?",
    "description": "Calculate average for numeric column"
  }},
  {{
    "question": "Show me the distribution of [categorical_column]",
    "description": "Analyze category distribution"
  }}
]

Generate questions now:
"""
        return prompt
    
    def _parse_llm_response(self, response: str) -> List[Dict[str, str]]:
        """Parse LLM response and validate format"""
        
        try:
            # Clean the response - remove any markdown formatting
            cleaned_response = response.strip()
            if cleaned_response.startswith('```json'):
                cleaned_response = cleaned_response[7:]
            if cleaned_response.endswith('```'):
                cleaned_response = cleaned_response[:-3]
            cleaned_response = cleaned_response.strip()
            
            questions = json.loads(cleaned_response)
            if not isinstance(questions, list):
                raise ValueError("Response is not a list")
            
            # Validate each question
            validated_questions = []
            for q in questions:
                if isinstance(q, dict) and "question" in q and "description" in q:
                    # Clean up the question and description
                    question = str(q["question"]).strip()
                    description = str(q["description"]).strip()
                    
                    # Remove any JSON artifacts
                    if question.startswith('"') and question.endswith('",'):
                        question = question[1:-2]
                    if description.startswith('"') and description.endswith('",'):
                        description = description[1:-2]
                    
                    if question and description and len(question) > 5:
                        validated_questions.append({
                            "question": question,
                            "description": description
                        })
            
            return validated_questions if validated_questions else []
            
        except json.JSONDecodeError:
            # Fallback parsing for non-JSON responses
            return self._parse_fallback_response(response)
    
    def _parse_fallback_response(self, content: str) -> List[Dict[str, str]]:
        """Parse fallback response when JSON parsing fails"""
        questions = []
        lines = content.split('\n')
        
        for line in lines:
            line = line.strip()
            if line.startswith('"') or line.startswith("'") or line.startswith('-'):
                question = line.strip('"\' -').strip()
                if question and len(question) > 10:
                    questions.append({
                        "question": question,
                        "description": "Generated question"
                    })
        
        return questions[:7]  # Limit to 7 questions
    
    def _get_fallback_questions(self, category: str, analysis: Dict[str, Any]) -> List[Dict[str, str]]:
        """Return fallback questions when LLM fails"""
        
        if category == "learn":
            return self._generate_learn_fallback(analysis)
        elif category == "explore":
            return self._generate_explore_fallback(analysis)
        elif category == "business":
            return self._generate_business_fallback(analysis)
        elif category == "visualize":
            return self._generate_visualize_fallback(analysis)
        else:
            return [
                {
                    "question": "What are the main insights from this dataset?",
                    "description": "Analyze key findings"
                }
            ]
    
    def _generate_learn_fallback(self, analysis: Dict[str, Any]) -> List[Dict[str, str]]:
        """Generate fallback learn questions"""
        questions = [
            {
                "question": "What are the main columns in this dataset?",
                "description": "Understand the data structure"
            },
            {
                "question": "How many rows and columns does this dataset have?",
                "description": "Get dataset overview"
            }
        ]
        
        if analysis.get("numeric_columns"):
            questions.append({
                "question": "What are the numeric columns in this data?",
                "description": "Identify quantitative data"
            })
        
        if analysis.get("categorical_columns"):
            questions.append({
                "question": "What are the categorical columns in this data?",
                "description": "Identify qualitative data"
            })
        
        return questions
    
    def _generate_explore_fallback(self, analysis: Dict[str, Any]) -> List[Dict[str, str]]:
        """Generate fallback explore questions"""
        questions = []
        
        if analysis.get("numeric_columns"):
            questions.extend([
                {
                    "question": "What are the trends in the numeric data?",
                    "description": "Discover patterns over time"
                },
                {
                    "question": "What are the correlations between numeric columns?",
                    "description": "Find relationships in data"
                }
            ])
        
        if analysis.get("categorical_columns"):
            questions.append({
                "question": "What are the most common values in each category?",
                "description": "Identify popular categories"
            })
        
        questions.append({
            "question": "What are the outliers in this dataset?",
            "description": "Find unusual data points"
        })
        
        return questions
    
    def _generate_business_fallback(self, analysis: Dict[str, Any]) -> List[Dict[str, str]]:
        """Generate fallback business questions"""
        questions = [
            {
                "question": "What are the main business insights from this data?",
                "description": "Extract actionable insights"
            }
        ]
        
        if analysis.get("numeric_columns"):
            questions.extend([
                {
                    "question": "What are the key performance indicators in this data?",
                    "description": "Identify important metrics"
                },
                {
                    "question": "What insights can help improve business performance?",
                    "description": "Find optimization opportunities"
                }
            ])
        
        if analysis.get("categorical_columns"):
            questions.append({
                "question": "Which categories show the best performance?",
                "description": "Identify top performers"
            })
        
        return questions
    
    def _generate_visualize_fallback(self, analysis: Dict[str, Any]) -> List[Dict[str, str]]:
        """Generate fallback visualize questions"""
        questions = []
        
        if analysis.get("numeric_columns"):
            questions.extend([
                {
                    "question": "Show me a bar chart of the top values",
                    "description": "Create bar visualization"
                },
                {
                    "question": "Create a line chart showing trends over time",
                    "description": "Visualize temporal trends"
                }
            ])
        
        if len(analysis.get("numeric_columns", [])) >= 2:
            questions.append({
                "question": "Show me a scatter plot of two numeric columns",
                "description": "Visualize relationships"
            })
        
        if analysis.get("categorical_columns"):
            questions.append({
                "question": "Create a pie chart of category distributions",
                "description": "Show category breakdown"
            })
        
        questions.append({
            "question": "Generate a comprehensive dashboard of key metrics",
            "description": "Create overview dashboard"
        })
        
        return questions

# Global instance
question_generator = QuestionGenerator() 