"use client";

import type { AnalysisTable } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AnalysisTablesProps {
  tables: AnalysisTable[];
}

export function AnalysisTables({ tables }: AnalysisTablesProps) {
  if (!tables || tables.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {tables.map((table, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-lg">{table.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  {table.headers.map((header, headerIndex) => (
                    <TableHead key={headerIndex} className="font-semibold">
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {table.rows.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
