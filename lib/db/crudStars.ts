"use server";

import { Stars } from "@prisma/client";
import prismaClient from "@/lib/prisma";

export const getStarsByUserIdandLevelId = async (
  userId: string,
  levelId: string
) => {
  try {
    const stars = await prismaClient.stars.findFirst({
      where: { userId, levelId },
    });
    console.log(`successfully got stars: ${stars}`);
    return { success: true, data: stars as Stars };
  } catch (error) {
    console.error(error);
    return { success: false, data: error as Error };
  }
};
