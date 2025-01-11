"use server";

import { Hints } from "@prisma/client";
import { prismaClient } from "./client";

export const createHint = async (data: Hints) => {
  try {
    const creationStatement = await prismaClient.hints.create({ data });
    console.log(`successfully created hint: ${creationStatement}`);
    return { success: true, data: creationStatement as Hints };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const getHintById = async (id: string) => {
  try {
    const hint = await prismaClient.hints.findUnique({ where: { id } });
    console.log(`successfully got hint: ${hint}`);
    return { success: true, data: hint as Hints };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const getAllHints = async () => {
  try {
    const allHints = await prismaClient.hints.findMany();
    console.log(`successfully got all hints: ${allHints}`);
    return { success: true, data: allHints as Hints[] };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const updateHint = async (id: string, data: Hints) => {
  try {
    const updatedHint = await prismaClient.hints.update({
      where: { id },
      data,
    });
    console.log(`successfully updated hint: ${updatedHint}`);
    return { success: true, data: updatedHint as Hints };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const deleteHint = async (id: string) => {
  try {
    const deletedHint = await prismaClient.hints.delete({ where: { id } });
    console.log(`successfully deleted hint: ${deletedHint}`);
    return { success: true, data: deletedHint as Hints };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};
