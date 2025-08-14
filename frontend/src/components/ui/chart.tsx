"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type ChartConfig = Record<
  string,
  {
    label: string;
    color: string;
  }
>;

interface ChartContainerProps {
  config: ChartConfig;
  children: React.ReactNode;
  className?: string;
}

export function ChartContainer({
  config,
  children,
  className,
}: ChartContainerProps) {
  return (
    <div
      className={cn("space-y-4", className)}
      style={
        {
          "--chart-1": config[Object.keys(config)[0]]?.color,
          "--chart-2": config[Object.keys(config)[1]]?.color,
          "--chart-3": config[Object.keys(config)[2]]?.color,
          "--chart-4": config[Object.keys(config)[3]]?.color,
          "--chart-5": config[Object.keys(config)[4]]?.color,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    color?: string;
    name?: string;
    value?: string | number;
    payload?: Record<string, unknown>;
  }>;
  label?: string;
  cursor?: boolean | unknown;
  children?: React.ReactNode;
  content?: React.ReactNode;
}

export function ChartTooltip({
  active,
  payload,
  label,
  cursor,
  children,
  content,
}: ChartTooltipProps) {
  if (!active || !payload) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      {content || children}
    </div>
  );
}

interface ChartTooltipContentProps {
  payload?: Array<{
    color?: string;
    name?: string;
    value?: string | number;
    payload?: Record<string, unknown>;
  }>;
  label?: string;
  indicator?: "line" | "bar";
  nameKey?: string;
  hideLabel?: boolean;
}

export function ChartTooltipContent({
  payload,
  label,
  indicator = "line",
  nameKey,
  hideLabel,
}: ChartTooltipContentProps) {
  if (!payload) {
    return null;
  }

  return (
    <div className="grid gap-2">
      {!hideLabel && (
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: payload[0]?.color,
              }}
            />
            <span className="font-medium">{label}</span>
          </div>
        </div>
      )}
      {payload.map((item, index: number) => (
        <div key={index} className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: item.color,
              }}
            />
            <span className="text-sm text-muted-foreground">
              {nameKey ? String(item.payload?.[nameKey] || "") : item.name}
            </span>
          </div>
          <span className="text-sm font-medium">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
