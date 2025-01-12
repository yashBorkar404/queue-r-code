"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface VideoPlayerProps {
  videoUrl: string;
}

export function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <Card className="overflow-hidden bg-card mb-6">
        <div className="aspect-video">
          <video className="w-full h-full object-cover" controls src={videoUrl}>
            Your browser does not support the video tag.
          </video>
        </div>
      </Card>
    </motion.div>
  );
}
