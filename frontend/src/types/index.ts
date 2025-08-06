export interface DataFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  columns: string[];
  rowCount: number;
}

export interface AnalysisResult {
  id: string;
  question: string;
  answer: string;
  data: Record<string, unknown>[];
  chart?: {
    type: "line" | "bar" | "pie" | "scatter";
    data: Record<string, unknown>;
    options: Record<string, unknown>;
  };
  createdAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
