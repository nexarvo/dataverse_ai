"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AnalysisResult } from "@/types";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  result: AnalysisResult;
}

export function ChatMessage({ result }: ChatMessageProps) {
  return (
    <div className="space-y-4">
      {/* User Question */}
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 max-w-3xl">
            <p className="text-gray-900 dark:text-white">{result.question}</p>
          </div>
        </div>
      </div>

      {/* Bot Answer */}
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
          <Bot className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 max-w-4xl">
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {result.answer}
            </p>

            {/* Chart Visualization */}
            {result.chart && (
              <div className="mb-3">
                <h4 className="font-medium mb-2 text-gray-900 dark:text-white text-sm">
                  Chart Visualization
                </h4>
                <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Chart placeholder - integrate with Chart.js or similar
                  </p>
                </div>
              </div>
            )}

            {/* Data Table */}
            {result.data.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 text-gray-900 dark:text-white text-sm">
                  Data Table
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 text-sm">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        {Object.keys(result.data[0]).map((key) => (
                          <th
                            key={key}
                            className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left text-gray-900 dark:text-white"
                          >
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.data.slice(0, 5).map((row, index) => (
                        <tr key={index} className="dark:bg-gray-900">
                          {Object.values(row).map((value, cellIndex) => (
                            <td
                              key={cellIndex}
                              className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-900 dark:text-white"
                            >
                              {String(value)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {result.data.length > 5 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Showing first 5 rows of {result.data.length} total rows
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
