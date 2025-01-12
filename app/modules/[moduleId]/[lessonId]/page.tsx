"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, PlayCircle, BookOpen } from "lucide-react";
import { getLevelById } from "@/lib/db/crudLevels";
import { Levels } from "@prisma/client";

export default function Page() {
  const params = useParams<{ moduleId: string; lessonId: string }>();
  const [level, setLevel] = useState<Levels>();
  const [explanation] = useState(
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
  );

  useEffect(() => {
    const getLesson = async () => {
      const res = await getLevelById(params.lessonId);
      if (!res.success) {
        throw new Error(`Failed to fetch level, ${res.data}`);
      } else {
        setLevel(res.data as Levels);
      }
    };
    getLesson();
  }, [params.lessonId]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background text-foreground"
    >
      <main className="container mx-auto p-4 lg:p-6 max-w-5xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="overflow-hidden bg-card mb-6">
            <div className="aspect-video">
              <video
                className="w-full h-full object-cover"
                controls
                src={level?.youtubeLink}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </Card>
        </motion.div>

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
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {explanation}
                  {explanation}
                  {explanation}
                  {explanation}
                </p>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center"
        >
          <Button className="px-8 py-6 text-lg font-semibold" size="lg">
            <PlayCircle className="mr-2 h-5 w-5" />
            Take Quiz
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </main>
    </motion.div>
  );
}
