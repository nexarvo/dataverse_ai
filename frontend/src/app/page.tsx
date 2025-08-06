"use client";

import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { DataAnalysis } from "@/components/DataAnalysis";
import { DataFile } from "@/types";

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<DataFile | undefined>();

  const handleFileUpload = (file: DataFile) => {
    setUploadedFile(file);
  };

  const handleFileRemove = () => {
    setUploadedFile(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Dataverse.ai
          </h1>
          <p className="text-lg text-gray-600">
            Upload your CSV and ask questions in plain English
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* File Upload Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Upload Your Data
            </h2>
            <FileUpload
              onFileUpload={handleFileUpload}
              onFileRemove={handleFileRemove}
              uploadedFile={uploadedFile}
            />
          </div>

          {/* Analysis Section */}
          {uploadedFile && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Ask Questions About Your Data
              </h2>
              <DataAnalysis file={uploadedFile} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
