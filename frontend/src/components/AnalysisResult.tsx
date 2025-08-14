"use client";

import type { AnalysisResult } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Copy, Check } from "lucide-react";
import { useState } from "react";
import { AnalysisTables } from "./AnalysisTables";

interface AnalysisResultProps {
  result: AnalysisResult;
}

export function AnalysisResult({ result }: AnalysisResultProps) {
  const [copied, setCopied] = useState(false);
  const [executed, setExecuted] = useState(result.executed);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(result.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  const executeCode = () => {
    // In a real implementation, this would execute the code in a safe environment
    // For now, we'll just show that it's been executed
    setExecuted(true);
  };

  return (
    <div className="space-y-4">
      {/* Question */}
      <div className="bg-gray-50 dark:bg-gray-800/20 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          Question
        </h3>
        <p className="text-gray-700 dark:text-gray-300">{result.question}</p>
      </div>

      {/* Explanation */}
      {result.explanation && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Explanation
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            {result.explanation}
          </p>
        </div>
      )}

      {/* Analysis Results */}
      {result.result &&
        result.result.tables &&
        result.result.tables.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Analysis Results
            </h3>
            <AnalysisTables tables={result.result.tables} />
          </div>
        )}

      {/* Summary (only show if no tables available) */}
      {result.result &&
        result.result.summary &&
        (!result.result.tables || result.result.tables.length === 0) && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Analysis Summary
            </h3>
            <pre className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm">
              {result.result.summary}
            </pre>
          </div>
        )}

      {/* Code */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Generated Code</CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{result.language}</Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={copyCode}
                className="flex items-center space-x-1"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={executeCode}
                className="flex items-center space-x-1"
                disabled={executed}
              >
                <Play className="h-4 w-4" />
                <span>{executed ? "Executed" : "Execute"}</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{result.code}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Execution Result */}
      {executed && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Execution Result</CardTitle>
          </CardHeader>
          <CardContent>
            {result.error ? (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  Error
                </h4>
                <p className="text-red-700 dark:text-red-300">{result.error}</p>
              </div>
            ) : (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                  Success
                </h4>
                <p className="text-green-700 dark:text-green-300">
                  Code executed successfully
                </p>
                {result.output && result.output.trim() && (
                  <div className="mt-4">
                    <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">
                      Execution Output:
                    </h5>
                    <pre className="bg-white dark:bg-gray-800 p-3 rounded border text-sm overflow-x-auto whitespace-pre-wrap">
                      {result.output}
                    </pre>
                  </div>
                )}
                {result.errors && result.errors.trim() && (
                  <div className="mt-4">
                    <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                      Warnings:
                    </h5>
                    <pre className="bg-white dark:bg-gray-800 p-3 rounded border text-sm overflow-x-auto whitespace-pre-wrap text-yellow-700 dark:text-yellow-300">
                      {result.errors}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Data Analysis */}
      {result.data_analysis && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Dataset Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Rows</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {result.data_analysis.total_rows?.toLocaleString() || "0"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Columns</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {result.data_analysis.total_columns || "0"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Numeric</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {Array.isArray(result.data_analysis.numeric_columns)
                    ? result.data_analysis.numeric_columns.length
                    : 0}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Categories</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {Array.isArray(result.data_analysis.categorical_columns)
                    ? result.data_analysis.categorical_columns.length
                    : 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
