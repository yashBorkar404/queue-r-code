"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getLevelById } from "@/lib/db/crudLevels";
import { Levels } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";

export default function Page() {
  const params = useParams<{ moduleId: string; lessonId: string }>();
  const [level, setLevel] = useState<Levels>();
  const [transcript] = useState(
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
      console.log(res.data);
    };
    getLesson();
  }, [params]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto p-4 lg:p-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Video Section */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden bg-card">
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
          </div>

          {/* Transcript Section */}
          <div className="lg:col-span-1">
            <Card className="h-[calc(100vh-12rem)] bg-card">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">Transcript</h2>
              </div>
              <ScrollArea className="h-[calc(100%-5rem)] p-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {transcript}
                  {transcript}
                  {transcript}
                  {transcript}
                </p>
              </ScrollArea>
            </Card>
          </div>
        </div>

        {/* Quiz Button */}
        <div className="mt-6">
          <Button
            className="w-full sm:w-auto px-8 py-6 text-lg font-semibold"
            size="lg"
          >
            Take Quiz
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </main>
    </div>
  );
}
