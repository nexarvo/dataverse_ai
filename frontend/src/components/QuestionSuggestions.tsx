"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { DataFile, AnalysisResult } from "@/types";
import { AnalysisResult as AnalysisResultComponent } from "./AnalysisResult";

interface QuestionSuggestionsProps {
  uploadedFile: DataFile | null;
}

interface Category {
  name: string;
  description: string;
  icon: string;
}

interface QuestionSuggestion {
  question: string;
  description: string;
}

interface SuggestionsResponse {
  category: Category;
  questions: QuestionSuggestion[];
  data_analysis: Record<string, unknown>;
}

export function QuestionSuggestions({
  uploadedFile,
  onPick,
}: QuestionSuggestionsProps & { onPick?: (question: string) => void }) {
  const [categories, setCategories] = useState<Record<string, Category> | null>(
    null
  );
  const [suggestions, setSuggestions] = useState<SuggestionsResponse | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("learn");
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [analyzing, setAnalyzing] = useState(false);

  const fileId = uploadedFile?.id;

  useEffect(() => {
    if (fileId) {
      setSuggestions(null);
      setAnalysisResult(null);
      setSelectedQuestion(null);
      fetchCategories();
    }
  }, [fileId]);

  useEffect(() => {
    if (fileId && selectedCategory) {
      fetchSuggestions();
    }
  }, [fileId, selectedCategory]);

  const fetchCategories = async () => {
    setCategoriesLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
        }/api/v1/categories`
      );
      const data = await response.json();

      if (data.success && data.data) {
        setCategories(data.data);
      } else {
        setError("Failed to load categories");
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setError("Failed to load categories");
    } finally {
      setCategoriesLoading(false);
    }
  };

  const fetchSuggestions = async () => {
    if (!fileId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
        }/api/v1/suggestions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            file_id: fileId,
            category: selectedCategory,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success && data.data) {
        setSuggestions(data.data);
      } else {
        setError(data.detail || "Failed to load suggestions");
        setSuggestions(null);
      }
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
      setError("Failed to load suggestions");
      setSuggestions(null);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionClick = async (question: string) => {
    if (!fileId) return;

    setSelectedQuestion(question);
    onPick?.(question);
    setAnalyzing(true);
    setAnalysisResult(null);

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
        }/api/v1/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            file_id: fileId,
            question: question,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success && data.data) {
        setAnalysisResult({
          ...data.data,
          createdAt: new Date(data.data.created_at),
        });
      } else {
        setError(data.detail || "Failed to analyze question");
      }
    } catch (error) {
      console.error("Failed to analyze question:", error);
      setError("Failed to analyze question");
    } finally {
      setAnalyzing(false);
    }
  };

  if (categoriesLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading categories...</span>
      </div>
    );
  }

  if (error && !suggestions) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        <Button onClick={fetchCategories} variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  if (!suggestions) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600 dark:text-gray-400">
          Please upload a file to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Choose a category:</h2>
        <div className="flex flex-wrap gap-3 justify-start">
          {categories &&
            Object.entries(categories).map(([key, category]) => (
              <Button
                key={key}
                variant={selectedCategory === key ? "default" : "outline"}
                onClick={() => setSelectedCategory(key)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full ${
                  selectedCategory === key
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <span className="whitespace-nowrap">{category.name}</span>
              </Button>
            ))}
        </div>
      </div>

      {/* Questions */}
      <div className="max-w-2xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Generating questions...</span>
          </div>
        ) : (
          <div className="space-y-3">
            {suggestions.questions.map((question, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedQuestion === question.question
                    ? "bg-gray-100 dark:bg-gray-800 border-gray-300"
                    : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
                onClick={() => handleQuestionClick(question.question)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-left">
                      {question.question}
                    </p>
                  </div>
                  {selectedQuestion === question.question && analyzing && (
                    <Loader2 className="h-4 w-4 animate-spin ml-2" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Analysis Result */}
      {analysisResult && (
        <div className="mt-8">
          <AnalysisResultComponent result={analysisResult} />
        </div>
      )}
    </div>
  );
}
