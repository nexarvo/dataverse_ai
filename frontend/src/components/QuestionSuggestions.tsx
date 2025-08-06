"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Sparkles } from "lucide-react";
import { apiClient } from "@/lib/api";

interface Category {
  name: string;
  description: string;
  icon: string;
}

interface QuestionSuggestion {
  question: string;
  description: string;
}

interface SuggestionsData {
  category: Category;
  questions: QuestionSuggestion[];
  data_analysis: Record<string, unknown>;
}

interface QuestionSuggestionsProps {
  fileId: string;
  onQuestionSelect: (question: string) => void;
}

export function QuestionSuggestions({
  fileId,
  onQuestionSelect,
}: QuestionSuggestionsProps) {
  const [categories, setCategories] = useState<Record<string, Category>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("learn");
  const [suggestions, setSuggestions] = useState<SuggestionsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debug logging
  console.log("QuestionSuggestions render:", {
    fileId,
    categoriesLoading,
    loading,
    error,
    suggestions: !!suggestions,
    categoriesCount: Object.keys(categories).length,
    selectedCategory,
  });

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch suggestions when category changes
  useEffect(() => {
    if (fileId && fileId.trim() !== "" && selectedCategory) {
      fetchSuggestions();
    } else if (fileId && fileId.trim() !== "") {
      // Reset suggestions when fileId changes but no category is selected
      setSuggestions(null);
      setError(null);
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
      console.log("Categories API response:", data);
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
      console.log("Suggestions API response:", data);
      if (response.ok && data.success && data.data) {
        setSuggestions(data.data);
      } else {
        console.error(
          "Failed to fetch suggestions:",
          data.detail || "Unknown error"
        );
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

  const handleCategorySelect = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
  };

  const handleQuestionClick = (question: string) => {
    onQuestionSelect(question);
  };

  // Show loading state for categories
  if (categoriesLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p className="text-gray-500 dark:text-gray-400">
            Loading categories...
          </p>
        </div>
      </div>
    );
  }

  // Show categories and loading state for suggestions
  if (!suggestions) {
    return (
      <div className="space-y-6">
        {/* Category Selector */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(categories).map(([key, category]) => (
            <Button
              key={key}
              variant={selectedCategory === key ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategorySelect(key)}
              className="flex items-center space-x-2"
            >
              <span>{category.name}</span>
            </Button>
          ))}
        </div>

        {/* Loading state for suggestions */}
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p className="text-gray-500 dark:text-gray-400">
              Loading suggestions...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show content when suggestions are available
  return (
    <div className="space-y-6">
      {/* Category Selector */}
      <div className="flex flex-wrap gap-2 justify-start items-center max-w-2xl mx-auto">
        {Object.entries(categories).map(([key, category]) => (
          <Button
            key={key}
            variant={selectedCategory === key ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategorySelect(key)}
            className="flex items-center space-x-2"
          >
            <span>{category.name}</span>
          </Button>
        ))}
      </div>

      {/* Questions in Horizontal Rows */}
      <div className="space-y-3 max-w-2xl mx-auto">
        {suggestions.questions.map((question, index) => (
          <div
            key={index}
            className="flex items-center justify-start px-4 py-3 cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 hover:rounded-lg"
            onClick={() => handleQuestionClick(question.question)}
          >
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white text-left">
                {question.question}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
