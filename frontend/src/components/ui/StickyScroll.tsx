"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  FileText,
  CheckCircle,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { DataQuestionInput } from "./DataQuestionInput";
import DisplayCards from "./DisplayCards";
import { DataChart } from "./DataChart";
import { DataTable } from "./DataTable";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, LabelList, Line, LineChart } from "recharts";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  // Chart data for revenue analytics
  const chartData = [
    { month: "Jan", revenue: 18600, fill: "var(--chart-1)" },
    { month: "Feb", revenue: 30500, fill: "var(--chart-2)" },
    { month: "Mar", revenue: 23700, fill: "var(--chart-3)" },
    { month: "Apr", revenue: 73000, fill: "var(--chart-4)" },
    { month: "May", revenue: 20900, fill: "var(--chart-5)" },
    { month: "Jun", revenue: 21400, fill: "var(--chart-1)" },
  ];

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "#3b82f6",
    },
  } satisfies ChartConfig;

  // Table data for product performance
  const products = [
    {
      id: "PROD001",
      name: "Product A",
      status: "Active",
      revenue: "$12,450",
      growth: "+15.2%",
    },
    {
      id: "PROD002",
      name: "Product B",
      status: "Active",
      revenue: "$8,920",
      growth: "+8.7%",
    },
    {
      id: "PROD003",
      name: "Product C",
      status: "Inactive",
      revenue: "$6,340",
      growth: "-2.1%",
    },
    {
      id: "PROD004",
      name: "Product D",
      status: "Active",
      revenue: "$15,200",
      growth: "+22.3%",
    },
  ];
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Calculate which card should be active based on scroll position
    // Add some delay to make it feel more natural
    const cardProgress = 1 / (cardLength - 1);
    const rawIndex = latest / cardProgress;

    // Add hysteresis to prevent flickering
    const currentIndex = activeCard;
    const newIndex = Math.min(Math.floor(rawIndex), cardLength - 1);

    // Only change if we've moved significantly
    if (Math.abs(newIndex - currentIndex) >= 0.5) {
      setActiveCard(newIndex);
    }
  });

  return (
    <motion.div
      className="min-h-screen flex justify-center relative space-x-10 rounded-md p-10 bg-black"
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.2,
                  y: activeCard === index ? 0 : 10,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.2,
                  y: activeCard === index ? 0 : 10,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.1,
                }}
                className="text-kg text-slate-300 max-w-sm mt-10"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        className={cn(
          "hidden lg:block h-60 w-80 rounded-md bg-black sticky top-10 overflow-hidden",
          contentClassName
        )}
      >
        {/* Upload Container for first card */}
        {activeCard === 0 && (
          <div className="absolute inset-0 p-6 flex flex-col justify-center">
            <div className="bg-black/40 border border-white/20 rounded-lg p-6">
              <div className="text-center space-y-2">
                <p className="text-white/80 text-[12px] font-medium text-left">
                  Uploading...
                </p>
                <Progress value={65} className="h-2" />
              </div>
            </div>
          </div>
        )}

        {/* Data Question Input for second card */}
        {activeCard === 1 && (
          <div className="absolute inset-0 p-6 flex flex-col justify-center">
            <DataQuestionInput
              placeholders={[
                "What's the trend in sales over the last quarter?",
                "Show me the top 10 customers by revenue",
                "Which products are performing best?",
                "What's the correlation between marketing spend and sales?",
                "Generate a report on customer satisfaction scores",
              ]}
              onChange={(e) => console.log("Question:", e.target.value)}
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Question submitted!");
              }}
            />
          </div>
        )}

        {/* Data Insights for third card */}
        {activeCard === 2 && (
          <div className="absolute inset-0 p-4 flex items-center justify-center">
            <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
              {/* Chart Card */}
              <div className="[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0 relative flex h-64 w-[28rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-white/20 hover:bg-muted [&>*]:flex [&>*]:items-center [&>*]:gap-2">
                <div className="h-32 w-full">
                  <ChartContainer config={chartConfig}>
                    <LineChart
                      accessibilityLayer
                      data={chartData}
                      margin={{
                        top: 12,
                        left: 12,
                        right: 12,
                        bottom: 12,
                      }}
                    >
                      <CartesianGrid
                        vertical={false}
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.1)"
                      />
                      <ChartTooltip
                        cursor={false}
                        content={
                          <ChartTooltipContent
                            indicator="line"
                            nameKey="revenue"
                            hideLabel
                          />
                        }
                      />
                      <Line
                        dataKey="revenue"
                        type="natural"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{
                          fill: "#3b82f6",
                          strokeWidth: 2,
                          r: 5,
                          stroke: "#ffffff",
                        }}
                        activeDot={{
                          r: 7,
                          stroke: "#3b82f6",
                          strokeWidth: 2,
                          fill: "#ffffff",
                        }}
                      >
                        <LabelList
                          position="top"
                          offset={8}
                          className="fill-white/80 text-xs font-medium"
                          fontSize={11}
                          dataKey="month"
                        />
                      </Line>
                    </LineChart>
                  </ChartContainer>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">Total: $187,100</span>
                  <span className="text-green-400">+12.5% vs last month</span>
                </div>
              </div>

              {/* Table Card */}
              <div className="[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0 relative flex h-48 w-[28rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-white/20 hover:bg-muted [&>*]:flex [&>*]:items-center [&>*]:gap-2">
                <div className="h-40 w-full overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10">
                        <TableHead className="text-white/60 text-xs">
                          Product
                        </TableHead>
                        <TableHead className="text-white/60 text-xs">
                          Status
                        </TableHead>
                        <TableHead className="text-white/60 text-xs">
                          Revenue
                        </TableHead>
                        <TableHead className="text-right text-white/60 text-xs">
                          Growth
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id} className="border-white/5">
                          <TableCell className="text-white text-xs font-medium">
                            {product.name}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                product.status === "Active"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {product.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-white/80 text-xs">
                            {product.revenue}
                          </TableCell>
                          <TableCell
                            className={`text-right text-xs ${
                              product.growth.startsWith("+")
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {product.growth}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow className="border-white/10">
                        <TableCell
                          colSpan={2}
                          className="text-white/60 text-xs"
                        >
                          Total Revenue
                        </TableCell>
                        <TableCell className="text-white text-xs font-medium">
                          $42,910
                        </TableCell>
                        <TableCell className="text-right text-green-400 text-xs">
                          +7.3% avg
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
