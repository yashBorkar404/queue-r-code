import { getLevelsByModuleId } from "@/lib/db/crudLevels";
import { getStarsByUserIdandLevelId } from "@/lib/db/crudStars";
import { LevelsContainer } from "./LevelsContainer";
import { auth } from "@/lib/auth";
import { Levels, Stars } from "@prisma/client";

export default async function LevelsPage(
  props: {
    params: Promise<{ moduleId: string }>;
  }
) {
  const params = await props.params;
  const session = await auth();
  const userId = session?.user?.id;

  const res = await getLevelsByModuleId(params.moduleId);
  if (!res.success) {
    throw new Error(`Failed to fetch levels, ${res.data}`);
  }
  const levels = res.data as Levels[];

  const levelsWithStars = await Promise.all(
    levels.map(async (level) => {
      if (!userId) {
        return { ...level, userStars: null };
      }
      const starsRes = await getStarsByUserIdandLevelId(userId, level.id);
      if (!starsRes.success) {
        throw new Error(`Failed to fetch stars, ${starsRes.data}`);
      }
      const stars = starsRes.data as Stars;
      return {
        ...level,
        userStars: stars,
      };
    })
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-300 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <LevelsContainer levels={levelsWithStars} moduleId={params.moduleId} />
      </main>
    </div>
  );
}
