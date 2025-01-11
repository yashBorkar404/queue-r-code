import { Modules } from "@prisma/client";
import { prismaClient } from "./client";

export const createModule = async (module: Modules) => {
  try {
    const newModule = await prismaClient.modules.create({ data: module });
    console.log(`successfully created module: ${newModule}`);
    return { success: true, data: newModule };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const getAllModules = async () => {
  try {
    const allModules = await prismaClient.modules.findMany();
    console.log(`successfully got all modules: ${allModules}`);
    return { success: true, data: allModules };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const getModuleById = async (id: string) => {
  try {
    const uniqueModule = await prismaClient.modules.findUnique({
      where: { id },
    });
    console.log(`successfully got module: ${uniqueModule}`);
    return { success: true, data: uniqueModule };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const updateModule = async (id: string, module: Modules) => {
  try {
    const updatedModule = await prismaClient.modules.update({
      where: { id },
      data: module,
    });
    console.log(`successfully updated module: ${updatedModule}`);
    return { success: true, data: updatedModule };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const deleteModule = async (id: string) => {
  try {
    const deletedModule = await prismaClient.modules.delete({ where: { id } });
    console.log(`successfully deleted module: ${deletedModule}`);
    return { success: true, data: deletedModule };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};
