"use client";

import { useState, useEffect } from "react";
import { ChatInput } from "@/components/ChatInput";
import { ChatMessage } from "@/components/ChatMessage";
import { QuestionSuggestions } from "@/components/QuestionSuggestions";
import { Sidebar } from "@/components/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DataFile, AnalysisResult } from "@/types";

interface ChatSession {
  id: string;
  name: string;
  file?: DataFile;
  messages: AnalysisResult[];
  createdAt: Date;
  updatedAt: Date;
}

export default function Home() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<
    string | undefined
  >();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const currentSession = sessions.find((s) => s.id === currentSessionId);
  const uploadedFile = currentSession?.file;
  const results = currentSession?.messages || [];

  // Debug logging
  console.log("Current session ID:", currentSessionId);
  console.log("Current session:", currentSession);
  console.log("Uploaded file:", uploadedFile);
  console.log("Total sessions:", sessions.length);

  // Ensure we have a current session when sessions exist
  useEffect(() => {
    if (sessions.length > 0 && !currentSessionId) {
      setCurrentSessionId(sessions[0].id);
    }
  }, [sessions, currentSessionId]);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      name: `New Chat ${sessions.length + 1}`,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSessions((prev) => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
  };

  const handleFileUpload = (file: DataFile) => {
    if (!currentSessionId) {
      // Create new session with the file already attached
      const newSession: ChatSession = {
        id: Date.now().toString(),
        name: file.name,
        file: file,
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setSessions((prev) => [newSession, ...prev]);
      setCurrentSessionId(newSession.id);
    } else {
      updateCurrentSession(file);
    }
  };

  const updateCurrentSession = (file?: DataFile) => {
    if (!currentSessionId) {
      console.warn("No current session ID when trying to update session");
      return;
    }

    setSessions((prev) => {
      const updated = prev.map((session) =>
        session.id === currentSessionId
          ? {
              ...session,
              file,
              updatedAt: new Date(),
              name: file ? file.name : session.name,
            }
          : session
      );
      console.log("Updated sessions:", updated);
      return updated;
    });
  };

  const handleFileRemove = () => {
    if (!currentSessionId) return;

    setSessions((prev) =>
      prev.map((session) =>
        session.id === currentSessionId
          ? {
              ...session,
              file: undefined,
              updatedAt: new Date(),
              name: `New Chat ${session.id.slice(-4)}`,
            }
          : session
      )
    );
  };

  const handleQuestionSubmit = async (question: string) => {
    if (!currentSessionId || !uploadedFile) return;

    setIsAnalyzing(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockResult: AnalysisResult = {
        id: Date.now().toString(),
        question: question,
        answer: `Based on the analysis of your ${uploadedFile.name} file, here are the key insights...`,
        data: [
          { category: "Category A", value: 150 },
          { category: "Category B", value: 200 },
          { category: "Category C", value: 100 },
        ],
        chart: {
          type: "bar",
          data: {
            labels: ["Category A", "Category B", "Category C"],
            datasets: [
              {
                label: "Values",
                data: [150, 200, 100],
                backgroundColor: ["#3B82F6", "#10B981", "#F59E0B"],
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top" as const,
              },
              title: {
                display: true,
                text: "Analysis Results",
              },
            },
          },
        },
        createdAt: new Date(),
      };

      setSessions((prev) =>
        prev.map((session) =>
          session.id === currentSessionId
            ? {
                ...session,
                messages: [mockResult, ...session.messages],
                updatedAt: new Date(),
              }
            : session
        )
      );
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSessionSelect = (sessionId: string) => {
    setCurrentSessionId(sessionId);
  };

  const handleNewSession = () => {
    createNewSession();
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (currentSessionId === sessionId) {
      setCurrentSessionId(sessions.length > 1 ? sessions[0]?.id : undefined);
    }
  };

  const handleExportSession = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      // Export functionality - could save as JSON or generate report
      console.log("Exporting session:", session);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSessionSelect={handleSessionSelect}
        onNewSession={handleNewSession}
        onDeleteSession={handleDeleteSession}
        onExportSession={handleExportSession}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-80">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-4 py-4">
            <ThemeToggle />
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-8 pb-32">
          {currentSessionId && results.length === 0 && uploadedFile && (
            <div className="space-y-6">
              {/* Question Suggestions */}
              <QuestionSuggestions
                fileId={uploadedFile?.id || ""}
                onQuestionSelect={handleQuestionSubmit}
              />
            </div>
          )}

          {/* Chat Messages */}
          <div className="space-y-6">
            {results.map((result) => (
              <ChatMessage key={result.id} result={result} />
            ))}
          </div>
        </div>

        {/* Chat Input */}
        <ChatInput
          onFileUpload={handleFileUpload}
          onQuestionSubmit={handleQuestionSubmit}
          uploadedFile={uploadedFile}
          onFileRemove={handleFileRemove}
          isAnalyzing={isAnalyzing}
        />
      </div>
    </div>
  );
}
