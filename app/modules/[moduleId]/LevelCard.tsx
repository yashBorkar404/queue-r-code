"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Levels, Stars } from "@prisma/client";

interface LevelCardProps {
  level: Levels;
  userStars: Stars | null;
  index: number;
  moduleId: string;
}

export function LevelCard({
  level,
  userStars,
  index,
  moduleId,
}: LevelCardProps) {
  const stars = [
    userStars?.easyStar || false,
    userStars?.mediumStar || false,
    userStars?.hardStar || false,
  ];

  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
      }}
    >
      <Card className="h-full dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <CardTitle className="text-2xl font-bold">{level.name}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex justify-center space-x-2 mb-4">
            {stars.map((star, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Star
                  className={`w-8 h-8 ${
                    star
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              </motion.div>
            ))}
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            {index === 0 ? "Beginner" : "Intermediate"}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href={`/modules/${moduleId}/${level.id}`} className="w-full">
            <Button className="w-full group" variant="default">
              Start Level
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
