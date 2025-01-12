"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getLevelsByModuleId } from "@/lib/db/crudLevels";
import { Levels } from "@prisma/client";

export default function LevelsPage() {
  const [levels, setLevels] = useState<Levels[]>([]);
  const router = useRouter();
  const params = useParams<{ moduleId: string }>();
  console.log(params);

  useEffect(() => {
    const fetchLevels = async () => {
      const res = await getLevelsByModuleId(params.moduleId);
      if (!res.success) {
        throw new Error(`Failed to fetch levels, ${res.data}`);
      }
      setLevels(res.data as Levels[]);
    };
    fetchLevels();
  }, [params.moduleId]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Game Levels
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {levels.map((level) => (
              <Card key={level.id} className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white">
                    {level.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3].map((star) => (
                      <Star
                        key={star}
                        className={`w-6 h-6 ${
                          star <= level.stars
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button
                    onClick={() => {
                      router.push(`/modules/${params.moduleId}/${level.id}`);
                    }}
                  >
                    Start Level
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
