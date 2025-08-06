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
        // Simulate file upload - replace with actual API call
        const mockFile: DataFile = {
          id: Date.now().toString(),
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: new Date(),
          columns: ["Column 1", "Column 2", "Column 3"], // Mock data
          rowCount: 1000,
        };

        // Simulate upload delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        onFileUpload(mockFile);
      } catch (error) {
        console.error("Upload failed:", error);
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
                <h3 className="font-semibold">{uploadedFile.name}</h3>
                <p className="text-sm text-gray-500">
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
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          {isUploading ? (
            <div>
              <p className="text-lg font-medium">Uploading...</p>
              <p className="text-sm text-gray-500">Please wait</p>
            </div>
          ) : (
            <div>
              <p className="text-lg font-medium">
                {isDragActive ? "Drop your file here" : "Upload your CSV file"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Drag and drop a CSV file here, or click to select
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Supports CSV, Excel files up to 50MB
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
