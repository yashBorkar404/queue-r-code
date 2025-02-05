"use server";
import { Levels } from "@prisma/client";
import prismaClient from "@/lib/prisma";

export const createLevel = async (level: Levels) => {
  try {
    const newLevel = await prismaClient.levels.create({ data: level });
    console.log(`successfully created level: ${newLevel}`);
    return { success: true, data: newLevel as Levels };
  } catch (error) {
    console.error(error);
    return { success: false, data: error as Error };
  }
};

export const getAllLevels = async () => {
  try {
    const allLevels = await prismaClient.levels.findMany();
    console.log(`successfully got all levels: ${allLevels}`);
    return { success: true, data: allLevels as Levels[] };
  } catch (error) {
    console.error(error);
    return { success: false, data: error as Error };
  }
};

export const getLevelsByModuleId = async (moduleId: string) => {
  try {
    const levels = await prismaClient.levels.findMany({ where: { moduleId } });
    console.log(`successfully got levels: ${levels}`);
    return { success: true, data: levels as Levels[] };
  } catch (error) {
    console.error(error);
    return { success: false, data: error as Error };
  }
};

export const getLevelById = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Level ID is required");
    }

    const level = await prismaClient.levels.findUnique({
      where: {
        id: id,
      },
    });

    if (!level) {
      throw new Error(`Level with ID ${id} not found`);
    }

    console.log(`Successfully got level: ${level.id}`);
    return { success: true, data: level as Levels };
  } catch (error) {
    console.error("Error fetching level:", error);
    return { success: false, data: error as Error };
  }
};

export const updateLevel = async (id: string, level: Levels) => {
  try {
    const updatedLevel = await prismaClient.levels.update({
      where: { id },
      data: level,
    });
    console.log(`successfully updated level: ${updatedLevel}`);
    return { success: true, data: updatedLevel as Levels };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const deleteLevel = async (id: string) => {
  try {
    const deletedLevel = await prismaClient.levels.delete({ where: { id } });
    console.log(`successfully deleted level: ${deletedLevel}`);
    return { success: true, data: deletedLevel };
  } catch (error) {
    console.error(error);
    return { success: false, data: error as Error };
  }
};
