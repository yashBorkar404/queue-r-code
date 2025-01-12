"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllModules } from "@/lib/db/crudModules";
import { Modules } from "@prisma/client";

export default function LearningModules() {
  const router = useRouter();
  const [modules, setModules] = useState<Modules[]>([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await getAllModules();
        if (!res.success) {
          throw new Error(`Failed to fetch modules, ${res.data}`);
        }
        setModules(res.data as Modules[]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchModules();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-300 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Choose Your Learning Path
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="h-full dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
                <CardHeader className="flex flex-row items-center gap-4">
                  <CardTitle className="text-2xl font-bold dark:text-white">
                    {module.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="dark:text-gray-300 text-lg">{module.desc}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => router.push(`/modules/${module.id}`)}
                    className="w-full group"
                  >
                    Start Learning
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
