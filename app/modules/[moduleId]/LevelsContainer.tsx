"use client";

import { motion } from "framer-motion";
import { Levels, Stars } from "@prisma/client";
import { LevelCard } from "./LevelCard";

interface LevelWithStars extends Levels {
  userStars: Stars | null;
}

interface LevelsContainerProps {
  levels: LevelWithStars[];
  moduleId: string;
}

export function LevelsContainer({ levels, moduleId }: LevelsContainerProps) {
  return (
    <>
      <motion.h1
        className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Game Levels
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {levels.map((level, index) => (
          <LevelCard
            key={level.id}
            level={level}
            userStars={level.userStars}
            index={index}
            moduleId={moduleId}
          />
        ))}
      </motion.div>
    </>
  );
}
