"use client";

import { useState } from "react";
import {
  MessageSquare,
  Plus,
  Trash2,
  FileText,
  Menu,
  X,
  Settings,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DataFile, AnalysisResult } from "@/types";

interface ChatSession {
  id: string;
  name: string;
  file?: DataFile;
  messages: AnalysisResult[];
  createdAt: Date;
  updatedAt: Date;
}

interface SidebarProps {
  sessions: ChatSession[];
  currentSessionId?: string;
  onSessionSelect: (sessionId: string) => void;
  onNewSession: () => void;
  onDeleteSession: (sessionId: string) => void;
  onExportSession: (sessionId: string) => void;
}

export function Sidebar({
  sessions,
  currentSessionId,
  onSessionSelect,
  onNewSession,
  onDeleteSession,
  onExportSession,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return "Today";
    } else if (days === 1) {
      return "Yesterday";
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const truncateText = (text: string, maxLength: number = 30) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <SidebarContent
            sessions={sessions}
            currentSessionId={currentSessionId}
            onSessionSelect={(id) => {
              onSessionSelect(id);
              setIsOpen(false);
            }}
            onNewSession={() => {
              onNewSession();
              setIsOpen(false);
            }}
            onDeleteSession={onDeleteSession}
            onExportSession={onExportSession}
            formatDate={formatDate}
            truncateText={truncateText}
          />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:z-50">
        <SidebarContent
          sessions={sessions}
          currentSessionId={currentSessionId}
          onSessionSelect={onSessionSelect}
          onNewSession={onNewSession}
          onDeleteSession={onDeleteSession}
          onExportSession={onExportSession}
          formatDate={formatDate}
          truncateText={truncateText}
        />
      </div>
    </>
  );
}

function SidebarContent({
  sessions,
  currentSessionId,
  onSessionSelect,
  onNewSession,
  onDeleteSession,
  onExportSession,
  formatDate,
  truncateText,
}: SidebarProps & {
  formatDate: (date: Date) => string;
  truncateText: (text: string, maxLength?: number) => string;
}) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Chat History
          </h2>
          <Button
            variant="outline"
            size="icon"
            onClick={onNewSession}
            className="h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Sessions List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {sessions.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No chat history yet
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Start a new conversation to see it here
              </p>
            </div>
          ) : (
            sessions.map((session) => (
              <div key={session.id}>
                <div
                  className={`group relative flex items-center space-x-3 rounded-md p-2 cursor-pointer transition-colors ${
                    currentSessionId === session.id
                      ? "bg-gray-100 dark:bg-gray-800/40"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => onSessionSelect(session.id)}
                >
                  {/* File Icon */}
                  <div className="flex-shrink-0">
                    {session.file ? (
                      <FileText className="h-4 w-4 text-gray-500" />
                    ) : (
                      <MessageSquare className="h-4 w-4 text-gray-400" />
                    )}
                  </div>

                  {/* Session Info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium truncate ${
                        currentSessionId === session.id
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {session.name}
                    </p>
                    {session.messages.length > 0 && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {truncateText(
                          session.messages[session.messages.length - 1].question
                        )}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {formatDate(session.updatedAt)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          onExportSession(session.id);
                        }}
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-red-500 hover:text-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSession(session.id);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
