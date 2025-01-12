"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modules } from "@prisma/client";

interface ModuleCardProps {
  module: Modules;
  index: number;
}

export function ModuleCard({ module, index }: ModuleCardProps) {
  return (
    <motion.div
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
          <Link href={`/modules/${module.id}`} className="w-full">
            <Button className="w-full group">
              Start Learning
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
