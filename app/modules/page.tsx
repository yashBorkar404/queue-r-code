import { getAllModules } from "@/lib/db/crudModules";
import { ModulesContainer } from "./ModuleContainer";
import { Modules } from "@prisma/client";

export default async function LearningModules() {
  const res = await getAllModules();
  if (!res.success) {
    throw new Error(`Failed to fetch modules, ${res.data}`);
  }
  const modules = res.data as Modules[];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-300 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <ModulesContainer modules={modules} />
      </main>
    </div>
  );
}
