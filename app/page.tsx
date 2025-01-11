"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useRouter } from "next/navigation";

export default function LearningModules() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-gray-800 dark:text-white">
                  LearnCS
                </span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/"
                  className="border-indigo-500 text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Modules
                </Link>
                <Link
                  href="/about"
                  className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  About
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Learning Modules
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Queue Module Card */}
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

            {/* Recursion Module Card */}
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
