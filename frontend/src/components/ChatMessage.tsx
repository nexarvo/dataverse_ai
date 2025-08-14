"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { AnalysisResult, AnalysisTable } from "@/types";

interface ChatMessageProps {
  result: AnalysisResult;
}

function InitialAvatar({ label, bg }: { label: string; bg: string }) {
  return (
    <div
      className={`flex-shrink-0 w-8 h-8 ${bg} rounded-full flex items-center justify-center text-white text-xs font-semibold`}
    >
      {label}
    </div>
  );
}

function MinimalTables({ tables }: { tables: AnalysisTable[] }) {
  if (!tables || tables.length === 0) return null;
  return (
    <div className="space-y-4">
      {tables.map((t, i) => (
        <div key={i} className="overflow-x-auto">
          <div className="text-sm font-medium mb-2 text-gray-900 dark:text-white">
            {t.title}
          </div>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                {t.headers.map((h, hi) => (
                  <th
                    key={hi}
                    className="px-3 py-2 text-left text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.rows.map((row, ri) => (
                <tr
                  key={ri}
                  className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800/60"
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-3 py-2 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

function VSCodeBlock({ code }: { code: string }) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    setDisplay("");
    if (!code) return;
    let i = 0;
    const chunk = Math.max(1, Math.floor(code.length / 120));
    const id = setInterval(() => {
      setDisplay((prev) =>
        i >= code.length ? prev : prev + code.slice(i, i + chunk)
      );
      i += chunk;
      if (i >= code.length) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [code]);

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-400" />
          <span className="ml-3 text-xs text-gray-600 dark:text-gray-300">
            analysis.py
          </span>
        </div>
      </div>
      <pre className="bg-gray-900 text-gray-100 text-xs md:text-sm p-4 overflow-x-auto">
        <code>{display}</code>
      </pre>
    </div>
  );
}

export function ChatMessage({ result }: ChatMessageProps) {
  const charts = useMemo(() => {
    const list = (result.result as any)?.charts;
    if (!list) return [] as string[];
    if (Array.isArray(list)) {
      return list.filter((c) => typeof c === "string") as string[];
    }
    return [] as string[];
  }, [result]);

  const tables = (result.result?.tables || []) as AnalysisTable[];
  const summary = result.result?.summary || "";

  const isPendingShell =
    !result.executed &&
    (!result.explanation || result.explanation.trim() === "") &&
    (result.id?.endsWith("-user") ?? false);

  return (
    <div className="space-y-4">
      {/* User bubble */}
      <div className="flex items-start gap-3">
        <InitialAvatar label="U" bg="bg-gray-500" />
        <div className="flex-1">
          <div className="bg-gray-50 dark:bg-gray-800/20 rounded-lg p-3 max-w-3xl">
            <p className="text-gray-900 dark:text-white">{result.question}</p>
          </div>
        </div>
      </div>

      {/* AI bubble */}
      <div className="flex items-start gap-3">
        <InitialAvatar label="DV" bg="bg-gray-700" />
        <div className="flex-1 space-y-3">
          {/* Summary text output (from stdout) */}
          {summary && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                Python output
              </div>
              <pre className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap text-sm">
                {summary}
              </pre>
            </div>
          )}

          {/* Tables */}
          {tables && tables.length > 0 && <MinimalTables tables={tables} />}

          {/* Charts */}
          {charts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {charts.map((src, i) => (
                <div
                  key={i}
                  className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                >
                  <img src={src} alt={`chart-${i}`} className="w-full h-auto" />
                </div>
              ))}
            </div>
          )}

          {/* Explanation */}
          {result.explanation && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                Explanation
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {result.explanation}
              </p>
            </div>
          )}

          {/* VSCode-like code block with typing effect */}
          {result.code && <VSCodeBlock code={result.code} />}

          {/* Pending state indicator */}
          {isPendingShell && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Analyzing...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
