"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, PlayCircle } from "lucide-react";
import Link from "next/link";

interface QuizButtonProps {
  moduleId: string;
  levelId: string;
}

export function QuizButton({ moduleId, levelId }: QuizButtonProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="flex justify-center"
    >
      <Link href={`/modules/${moduleId}/${levelId}/quiz`}>
        <Button className="px-8 py-6 text-lg font-semibold" size="lg">
          <PlayCircle className="mr-2 h-5 w-5" />
          Take Quiz
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
    </motion.div>
  );
}
