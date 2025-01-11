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
import { useRouter } from "next/navigation";

const levels = [
  { id: 1, name: "Beginner's Queue", stars: 2 },
  { id: 2, name: "Advanced Queue Operations", stars: 1 },
  { id: 3, name: "Recursion Basics", stars: 3 },
  { id: 4, name: "Recursive Backtracking", stars: 0 },
  { id: 5, name: "Dynamic Programming", stars: 1 },
  { id: 6, name: "Graph Algorithms", stars: 0 },
];

export default function LevelsPage() {
  const router = useRouter();

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
                      router.push("/queue/level");
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
