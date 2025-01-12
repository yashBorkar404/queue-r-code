"use client";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen } from "lucide-react";

interface ExplanationCardProps {
  description: string;
}

export function ExplanationCard({ description }: ExplanationCardProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <Card className="bg-card mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            <BookOpen className="mr-2 h-5 w-5" />
            Explanation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] w-full rounded-md border p-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  );
}
