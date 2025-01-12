"use server";

import { Options } from "@prisma/client";
import prismaClient from "@/lib/prisma";

export const createOption = async (option: Options) => {
  try {
    const newOption = await prismaClient.options.create({ data: option });
    console.log(`successfully created option: ${newOption}`);
    return { success: true, data: newOption };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const getAllOptions = async () => {
  try {
    const allOptions = await prismaClient.options.findMany();
    console.log(`successfully got all options: ${allOptions}`);
    return { success: true, data: allOptions };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const getOptionById = async (id: string) => {
  try {
    const option = await prismaClient.options.findUnique({ where: { id } });
    console.log(`successfully got option: ${option}`);
    return { success: true, data: option };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const updateOption = async (id: string, option: Options) => {
  try {
    const updatedOption = await prismaClient.options.update({
      where: { id },
      data: option,
    });
    console.log(`successfully updated option: ${updatedOption}`);
    return { success: true, data: updatedOption };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const deleteOption = async (id: string) => {
  try {
    const deletedOption = await prismaClient.options.delete({ where: { id } });
    console.log(`successfully deleted option: ${deletedOption}`);
    return { success: true, data: deletedOption };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};
