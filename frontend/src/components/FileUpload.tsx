"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DataFile } from "@/types";

interface FileUploadProps {
  onFileUpload: (file: DataFile) => void;
  onFileRemove: () => void;
  uploadedFile?: DataFile;
}

export function FileUpload({
  onFileUpload,
  onFileRemove,
  uploadedFile,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
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
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    multiple: false,
  });

  if (uploadedFile) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {uploadedFile.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {uploadedFile.rowCount.toLocaleString()} rows •{" "}
                  {uploadedFile.columns.length} columns
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onFileRemove}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          {isUploading ? (
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Uploading...
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Please wait
              </p>
            </div>
          ) : (
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {isDragActive ? "Drop your file here" : "Upload your CSV file"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Drag and drop a CSV file here, or click to select
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Supports CSV, Excel files up to 50MB
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
