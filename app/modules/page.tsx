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
import { useEffect, useState } from "react";
import { Modules } from "@prisma/client";
import { getAllModules } from "@/lib/db/crudModules";

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
        console.log(error);
      }
    };

    fetchModules();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Learning Modules
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules &&
              modules.map((module) => (
                <Card key={module.id} className="dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="dark:text-white">
                      {module.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="dark:text-gray-300">{module.desc}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => {
                        router.push(`/modules/${module.id}`);
                      }}
                    >
                      Learn
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
