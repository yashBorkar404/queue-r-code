"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight, Lock } from "lucide-react";
import { getLevelsByModuleId } from "@/lib/db/crudLevels";
import { Levels } from "@prisma/client";

export default function LevelsPage() {
  const [levels, setLevels] = useState<Levels[]>([]);
  const router = useRouter();
  const params = useParams<{ moduleId: string }>();

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const res = await getLevelsByModuleId(params.moduleId);
        if (!res.success) {
          throw new Error(`Failed to fetch levels, ${res.data}`);
        }
        setLevels(res.data as Levels[]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLevels();
  }, [params.moduleId]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-300 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Game Levels
        </motion.h1>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/*TODO: Fetch stars based on the user ID */}
          {levels.map((level, index) => (
            <motion.div key={level.id} variants={itemVariants}>
              <Card className="h-full dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <CardTitle className="text-2xl font-bold">
                    {level.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex justify-center space-x-2 mb-4">
                    {[level.easyStar, level.mediumStar, level.hardStar].map(
                      (star, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + i * 0.1 }}
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        </motion.div>
                      )
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    {index === 0
                      ? "Beginner"
                      : index === levels.length - 1
                      ? "Expert"
                      : "Intermediate"}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button
                    onClick={() => {
                      router.push(`/modules/${params.moduleId}/${level.id}`);
                    }}
                    className="w-full group"
                    variant={"default"}
                  >
                    <>
                      Start Level
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
