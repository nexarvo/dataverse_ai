"use client";

import { motion } from "framer-motion";
import { Sparkles } from "./Sparkles";
import {
  PostgreSQL,
  MongoDB,
  MySQL,
  Snowflake,
  BigQuery,
  Redshift,
  Excel,
  GoogleSheets,
  Salesforce,
  HubSpot,
} from "./Logo";

const tools = [
  { name: "PostgreSQL", component: PostgreSQL },
  { name: "MongoDB", component: MongoDB },
  { name: "MySQL", component: MySQL },
  { name: "Snowflake", component: Snowflake },
  { name: "BigQuery", component: BigQuery },
  { name: "Redshift", component: Redshift },
  { name: "Excel", component: Excel },
  { name: "Google Sheets", component: GoogleSheets },
  { name: "Salesforce", component: Salesforce },
  { name: "HubSpot", component: HubSpot },
];

export function DataTools() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <div className="mx-auto mt-32 w-screen max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-3xl text-white mb-4"
        >
          <span className="text-indigo-200">
            Connect to your existing tools.
          </span>
          <br />
          <span>Works with the tools you already use.</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-14 grid grid-cols-5 gap-8"
        >
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-2 group"
            >
              <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800/50 group-hover:border-gray-700/50 transition-all duration-300 group-hover:bg-gray-900/70">
                <tool.component />
              </div>
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                {tool.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="relative -mt-32 h-96 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#E89450FF,transparent_70%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[100%] after:border-t after:border-[#7876c566] after:bg-zinc-900">
        <Sparkles
          density={800}
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </div>
    </div>
  );
}
