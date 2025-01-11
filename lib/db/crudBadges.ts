"use server";

import { Badges } from "@prisma/client";
import { prismaClient } from "./client";

export const createBadge = async (badge: Badges) => {
  try {
    const newBadge = await prismaClient.badges.create({ data: badge });
    console.log(`successfully created badge: ${newBadge}`);
    return { success: true, data: newBadge };
  } catch (error) {
    console.error(`error creating badge: ${error}`);
    return { success: false, data: error };
  }
};

export const getAllBadges = async () => {
  try {
    const allBadges = await prismaClient.badges.findMany();
    console.log(`successfully got all badges: ${allBadges}`);
    return { success: true, data: allBadges };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const getBadgeById = async (id: string) => {
  try {
    const badge = await prismaClient.badges.findUnique({ where: { id } });
    console.log(`successfully got badge: ${badge}`);
    return { success: true, data: badge };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const updateBadge = async (id: string, badge: Badges) => {
  try {
    const updatedBadge = await prismaClient.badges.update({
      where: { id },
      data: badge,
    });
    console.log(`successfully updated badge: ${updatedBadge}`);
    return { success: true, data: updatedBadge };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const deleteBadge = async (id: string) => {
  try {
    const deletedBadge = await prismaClient.badges.delete({ where: { id } });
    console.log(`successfully deleted badge: ${deletedBadge}`);
    return { success: true, data: deletedBadge };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};
