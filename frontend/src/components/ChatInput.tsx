"use client";

import { useState, useRef } from "react";
import { Plus, Send, Upload, X, Mic, ArrowUpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataFile } from "@/types";

interface ChatInputProps {
  onFileUpload: (file: DataFile) => void;
  onQuestionSubmit: (question: string) => void;
  uploadedFile?: DataFile;
  onFileRemove: () => void;
  isAnalyzing?: boolean;
}

export function ChatInput({
  onFileUpload,
  onQuestionSubmit,
  uploadedFile,
  onFileRemove,
  isAnalyzing = false,
}: ChatInputProps) {
  const [question, setQuestion] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && uploadedFile) {
      onQuestionSubmit(question);
      setQuestion("");
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("file", file);

      // Upload file to backend
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
        }/api/v1/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok && data.success && data.data) {
        // Convert backend response to frontend DataFile format
        const uploadedFile: DataFile = {
          id: data.data.id,
          name: data.data.name,
          size: data.data.size,
          type: data.data.type,
          uploadedAt: new Date(data.data.uploaded_at || Date.now()),
          columns: data.data.columns || [],
          rowCount: data.data.row_count || 0,
        };

        onFileUpload(uploadedFile);
      } else {
        console.error("Upload failed:", data.detail || "Unknown error");
        throw new Error(data.detail || "Upload failed");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4">
      <div className="max-w-4xl mx-auto">
        {/* File Upload Status (compact chip in chat header) */}
        {uploadedFile && (
          <div className="mb-2">
            <div
              className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 text-sm px-3 py-1 max-w-xs w-auto break-words"
              style={{ maxWidth: "360px" }}
              title={`${
                uploadedFile.name
              } • ${uploadedFile.rowCount.toLocaleString()} rows`}
            >
              <Upload className="h-3 w-3 mr-1" />
              <span className="truncate">{uploadedFile.name}</span>
              <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                {uploadedFile.rowCount.toLocaleString()} rows
              </span>
              <button
                type="button"
                aria-label="Remove file"
                onClick={onFileRemove}
                className="ml-2 text-xs text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="relative">
          {/* Main Input Container */}
          <div className="relative bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 px-4">
            {/* Input Field */}
            <div className="relative">
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={
                  uploadedFile
                    ? "Ask anything about your data..."
                    : "Upload a file first, then ask questions..."
                }
                disabled={!uploadedFile || isAnalyzing}
                className="h-12 bg-gray-50 dark:bg-gray-800 border-none p-0 text-lg placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-0 focus:!border-0 focus:!shadow-none focus:!ring-0 focus:!outline-none focus:!outline-0 focus:!border-transparent"
              />
            </div>

            {/* Icons Row - Below input */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* Upload Button */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={triggerFileUpload}
                  disabled={isUploading}
                  className="h-8 px-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {isUploading ? (
                    <div className="h-3 w-3 animate-spin rounded-full border-2 border-gray-400 border-t-gray-600" />
                  ) : (
                    <Plus className="!h-6 !w-6 font-bold" strokeWidth={2} />
                  )}
                </Button>
              </div>

              {/* Microphone Button */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={!question.trim() || !uploadedFile || isAnalyzing}
                className="h-12 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {isAnalyzing ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <ArrowUpCircle
                    className="!h-8 !w-8 font-bold"
                    strokeWidth={2}
                  />
                )}
              </Button>
            </div>
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            className="hidden"
          />
        </form>
      </div>
    </div>
  );
}
