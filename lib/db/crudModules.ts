"use server";

import { Modules } from "@prisma/client";
import { prismaClient } from "./client";

export const createModule = async (module: Modules) => {
  try {
    const newModule = await prismaClient.modules.create({ data: module });
    if (!newModule) {
      console.error("Failed to create module");
      return { success: false, data: "Failed to create module" };
    }
    console.log(`Successfully created module: ${newModule}`);
    return { success: true, data: newModule as Modules };
  } catch (error) {
    console.error("Error creating module:", error);
    return { success: false, data: error || "An error occurred" };
  }
};

export const getAllModules = async () => {
  try {
    const allModules = await prismaClient.modules.findMany();
    if (!allModules) {
      console.error("No modules found");
      return { success: false, data: "No modules found" };
    }
    console.log(`Successfully got all modules: ${allModules}`);
    return { success: true, data: allModules as Modules[] };
  } catch (error) {
    console.error("Error fetching modules:", error);
    return { success: false, data: error || "An error occurred" };
  }
};

export const getModuleById = async (id: string) => {
  try {
    const uniqueModule = await prismaClient.modules.findUnique({
      where: { id },
    });

    if (!uniqueModule) {
      console.error(`Module with id ${id} not found`);
      return { success: false, data: `Module with id ${id} not found` };
    }

    console.log(`Successfully got module: ${uniqueModule}`);
    return { success: true, data: uniqueModule as Modules };
  } catch (error) {
    console.error("Error fetching module:", error);
    return { success: false, data: error || "An error occurred" };
  }
};

export const updateModule = async (id: string, module: Modules) => {
  try {
    const updatedModule = await prismaClient.modules.update({
      where: { id },
      data: module,
    });
    if (!updatedModule) {
      console.error("Failed to update module");
      return { success: false, data: "Failed to update module" };
    }
    console.log(`Successfully updated module: ${updatedModule}`);
    return { success: true, data: updatedModule as Modules };
  } catch (error) {
    console.error("Error updating module:", error);
    return { success: false, data: error || "An error occurred" };
  }
};

export const deleteModule = async (id: string) => {
  try {
    const deletedModule = await prismaClient.modules.delete({ where: { id } });
    console.log(`successfully deleted module: ${deletedModule}`);
    return { success: true, data: deletedModule as Modules };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};
