import { DataFile, AnalysisResult, ApiResponse } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async uploadFile(file: File): Promise<ApiResponse<DataFile>> {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${this.baseUrl}/api/v1/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Upload failed",
      };
    }
  }

  async analyzeData(
    fileId: string,
    question: string
  ): Promise<ApiResponse<AnalysisResult>> {
    return this.request<AnalysisResult>("/api/v1/analyze", {
      method: "POST",
      body: JSON.stringify({ fileId, question }),
    });
  }

  async analyzeCustomQuestion(
    fileId: string,
    question: string
  ): Promise<ApiResponse<AnalysisResult>> {
    return this.request<AnalysisResult>("/api/v1/analyze/custom", {
      method: "POST",
      body: JSON.stringify({ fileId, question }),
    });
  }

  async getFileInfo(fileId: string): Promise<ApiResponse<DataFile>> {
    return this.request<DataFile>(`/api/v1/files/${fileId}`);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
