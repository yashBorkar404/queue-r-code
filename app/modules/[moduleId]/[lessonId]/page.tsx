"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getLevelById } from "@/lib/db/crudLevels";
import { Levels } from "@prisma/client";

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
    <div className="flex flex-col w-full h-screen p-6 bg-gray-50">
      <div className="flex flex-1 gap-6">
        {/* Video Player Section */}
        <div className="flex-1 bg-gray-900 flex h-full items-center justify-center rounded-lg shadow-lg overflow-hidden">
          {/* Placeholder for Video Player */}
          <video
            className="w-full h-full object-cover"
            controls
            src={level?.youtubeLink}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Transcript Section */}
        <Card className="w-1/3 p-6 h-full shadow-lg flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Transcript</h2>
          <p className="text-sm text-gray-700 overflow-y-auto h-full leading-relaxed scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {transcript}
            {transcript}
            {transcript}
            {transcript}
          </p>
        </Card>
      </div>

      {/* Take Quiz Button */}
      <div className="mt-6">
        <Button className="w-full py-4 text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-md">
          Take Quiz
        </Button>
      </div>
    </div>
  );
}
