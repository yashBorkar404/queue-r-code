import { getLevelById } from "@/lib/db/crudLevels";
import { VideoPlayer } from "./VideoPlayer";
import { ExplanationCard } from "./ExplanationCard";
import { QuizButton } from "./QuizButton";
import { notFound } from "next/navigation";
import { Levels } from "@prisma/client";

interface PageProps {
  params: Promise<{
    moduleId: string;
    lessonId: string;
  }>;
}

export default async function LevelPage(props: PageProps) {
  const params = await props.params;
  if (!params.lessonId || !params.moduleId) {
    notFound();
  }

  const res = await getLevelById(params.lessonId);

  if (!res.success || !res.data) {
    throw new Error(
      res.data instanceof Error ? res.data.message : "Failed to fetch level"
    );
  }

  const level = res.data as Levels;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto p-4 lg:p-6 max-w-5xl">
        <VideoPlayer videoUrl={level.youtubeLink} />
        <ExplanationCard description={level.descritpion} />
        <QuizButton moduleId={params.moduleId} levelId={level.id} />
      </main>
    </div>
  );
}
