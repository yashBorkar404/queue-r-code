"use server";
import { User } from "@prisma/client";
import { prismaClient } from "./client";

export const createUser = async (data: User) => {
  try {
    const creationStatement = await prismaClient.user.create({ data });
    console.log(`successfully created user: ${creationStatement}`);
    return { success: true, data: creationStatement };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const getAllUsers = async () => {
  try {
    const allUsers = await prismaClient.user.findMany();
    console.log(`successfully got all users: ${allUsers}`);
    return { success: true, data: allUsers };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prismaClient.user.findUnique({ where: { id } });
    console.log(`successfully got user: ${user}`);
    return { success: true, data: user };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const updateUser = async (id: string, data: User) => {
  try {
    const updatedUser = await prismaClient.user.update({ where: { id }, data });
    console.log(`successfully updated user: ${updatedUser}`);
    return { success: true, data: updatedUser };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const deleteUser = async (id: string) => {
  try {
    const deletedUser = await prismaClient.user.delete({ where: { id } });
    console.log(`successfully deleted user: ${deletedUser}`);
    return { success: true, data: deletedUser };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};
