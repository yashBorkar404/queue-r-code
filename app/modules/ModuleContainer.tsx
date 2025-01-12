"use client";

import { motion } from "framer-motion";
import { ModuleCard } from "./ModuleCard";
import { Modules } from "@prisma/client";

interface ModulesContainerProps {
  modules: Modules[];
}

export function ModulesContainer({ modules }: ModulesContainerProps) {
  return (
    <>
      <motion.h1
        className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Choose Your Learning Path
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {modules.map((module, index) => (
          <ModuleCard key={module.id} module={module} index={index} />
        ))}
      </div>
    </>
  );
}
