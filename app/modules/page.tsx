"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LearningModules() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Learning Modules
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Queue Module</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="dark:text-gray-300">
                  Learn about queues, their operations, and applications in
                  computer science.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => {
                    router.push("/queue");
                  }}
                >
                  Learn Queue
                </Button>
              </CardFooter>
            </Card>

            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">
                  Recursion Module
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="dark:text-gray-300">
                  Explore recursive algorithms, their implementation, and
                  problem-solving techniques.
                </p>
              </CardContent>
              <CardFooter>
                <Button>Learn Recursion</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
