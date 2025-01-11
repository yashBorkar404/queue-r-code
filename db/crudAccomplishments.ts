"use server";

import { Accomplishments } from "@prisma/client";
import { prismaClient } from "./client";

export const getAllAccomplishments = async () => {
  try {
    const allAccomplishments = await prismaClient.accomplishments.findMany();
    console.log(`successfully got all accomplishments: ${allAccomplishments}`);
    return { success: true, data: allAccomplishments };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const getAccomplishmentsByUserId = async (userId: string) => {
  try {
    const accomplishments = await prismaClient.accomplishments.findMany({
      where: { userId },
    });
    console.log(`successfully got accomplishments: ${accomplishments}`);
    return { success: true, data: accomplishments };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const createAccomplishment = async (data: Accomplishments) => {
  try {
    const accomplishment = await prismaClient.accomplishments.create({ data });
    console.log(`successfully created accomplishment: ${accomplishment}`);
    return { success: true, data: accomplishment };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const updateAccomplishment = async (
  id: string,
  data: Accomplishments
) => {
  try {
    const updatedAccomplishment = await prismaClient.accomplishments.update({
      where: { id },
      data,
    });
    console.log(
      `successfully updated accomplishment: ${updatedAccomplishment}`
    );
    return { success: true, data: updatedAccomplishment };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const deleteAccomplishment = async (id: string) => {
  try {
    const deletedAccomplishment = await prismaClient.accomplishments.delete({
      where: { id },
    });
    console.log(
      `successfully deleted accomplishment: ${deletedAccomplishment}`
    );
    return { success: true, data: deletedAccomplishment };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};
