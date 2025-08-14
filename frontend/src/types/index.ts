export interface DataFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  columns: string[];
  rowCount: number;
}

export interface AnalysisTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface AnalysisResult {
  id: string;
  question: string;
  code: string;
  language: string;
  explanation: string;
  executed: boolean;
  output?: string;
  errors?: string;
  result?: {
    tables: AnalysisTable[];
    charts: Record<string, unknown>[];
    summary: string;
  };
  error?: string;
  data_analysis?: Record<string, unknown>;
  createdAt: Date;
}

export interface ChatSession {
  id: string;
  name: string;
  file?: DataFile;
  messages: AnalysisResult[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
