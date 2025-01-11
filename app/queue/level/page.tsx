"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function VideoPlayerPage() {
  const [description, setDescription] = useState(
    "This is a sample video description. You can edit this text to provide information about the video content, learning objectives, or any other relevant details."
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Video Lesson
          </h1>

          <div className="aspect-w-16 aspect-h-18 mb-6">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              width="100%"
              height="100%"
              controls={true}
              config={{
                youtube: {
                  playerVars: { origin: "https://www.youtube.com" },
                },
              }}
            />
          </div>

          <Card className="dark:bg-gray-800">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Video Description
              </h2>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-32 p-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                placeholder="Enter video description here..."
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
