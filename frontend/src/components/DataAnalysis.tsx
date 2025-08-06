"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataFile, AnalysisResult } from "@/types";

interface DataAnalysisProps {
  file: DataFile;
}

export function DataAnalysis({ file }: DataAnalysisProps) {
  const [question, setQuestion] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult[]>([]);

  const handleAnalyze = async () => {
    if (!question.trim()) return;

    setIsAnalyzing(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockResult: AnalysisResult = {
        id: Date.now().toString(),
        question: question,
        answer: `Based on the analysis of your ${file.name} file, here are the key insights...`,
        data: [
          { category: "Category A", value: 150 },
          { category: "Category B", value: 200 },
          { category: "Category C", value: 100 },
        ],
        chart: {
          type: "bar",
          data: {
            labels: ["Category A", "Category B", "Category C"],
            datasets: [
              {
                label: "Values",
                data: [150, 200, 100],
                backgroundColor: ["#3B82F6", "#10B981", "#F59E0B"],
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top" as const,
              },
              title: {
                display: true,
                text: "Analysis Results",
              },
            },
          },
        },
        createdAt: new Date(),
      };

      setResults((prev) => [mockResult, ...prev]);
      setQuestion("");
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAnalyze();
    }
  };

  return (
    <div className="space-y-6">
      {/* Question Input */}
      <Card>
        <CardHeader>
          <CardTitle>Ask a Question</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="e.g., What are the top 5 revenue sources? Show me a trend analysis of sales over time. Which customers have the highest lifetime value?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              className="min-h-[100px]"
            />
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Examples: &quot;Show me sales trends&quot;, &quot;What&apos;s
                the average order value?&quot;, &quot;Top 10 customers&quot;
              </p>
              <Button
                onClick={handleAnalyze}
                disabled={!question.trim() || isAnalyzing}
                className="flex items-center space-x-2"
              >
                {isAnalyzing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span>{isAnalyzing ? "Analyzing..." : "Analyze"}</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Analysis Results</h3>
          {results.map((result) => (
            <Card key={result.id}>
              <CardHeader>
                <CardTitle className="text-lg">{result.question}</CardTitle>
                <p className="text-sm text-gray-500">
                  {result.createdAt.toLocaleString()}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{result.answer}</p>
                  </div>

                  {result.chart && (
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Chart Visualization</h4>
                      <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                        <p className="text-gray-500">
                          Chart placeholder - integrate with Chart.js or similar
                        </p>
                      </div>
                    </div>
                  )}

                  {result.data.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Data Table</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200">
                          <thead>
                            <tr className="bg-gray-50">
                              {Object.keys(result.data[0]).map((key) => (
                                <th
                                  key={key}
                                  className="border border-gray-200 px-4 py-2 text-left"
                                >
                                  {key}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {result.data.map((row, index) => (
                              <tr key={index}>
                                {Object.values(row).map((value, cellIndex) => (
                                  <td
                                    key={cellIndex}
                                    className="border border-gray-200 px-4 py-2"
                                  >
                                    {String(value)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
