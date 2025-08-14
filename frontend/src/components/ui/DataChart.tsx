"use client";

import { TrendingUp } from "lucide-react";

export function DataChart() {
  return (
    <div className="w-full h-full bg-white/10 rounded-lg p-4 border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-medium">Sales Trend</h3>
        <div className="flex items-center gap-2 text-green-400 text-sm">
          <TrendingUp className="h-4 w-4" />
          +12.5%
        </div>
      </div>

      {/* Simple chart visualization */}
      <div className="flex items-end justify-between h-32 gap-1">
        <div
          className="flex-1 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-sm"
          style={{ height: "60%" }}
        ></div>
        <div
          className="flex-1 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-sm"
          style={{ height: "80%" }}
        ></div>
        <div
          className="flex-1 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-sm"
          style={{ height: "45%" }}
        ></div>
        <div
          className="flex-1 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-sm"
          style={{ height: "90%" }}
        ></div>
        <div
          className="flex-1 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-sm"
          style={{ height: "70%" }}
        ></div>
        <div
          className="flex-1 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-sm"
          style={{ height: "85%" }}
        ></div>
      </div>

      <div className="flex justify-between text-xs text-white/60 mt-2">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
      </div>
    </div>
  );
}
