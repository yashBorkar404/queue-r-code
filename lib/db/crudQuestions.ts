"use server";

import { Questions } from "@prisma/client";
import prismaClient from "@/lib/prisma";

export const createQuestion = async (question: Questions) => {
  try {
    const newQuestion = await prismaClient.questions.create({ data: question });
    console.log(`successfully created question: ${newQuestion}`);
    return { success: true, data: newQuestion };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const getAllQuestions = async () => {
  try {
    const allQuestions = await prismaClient.questions.findMany();
    console.log(`successfully got all questions: ${allQuestions}`);
    return { success: true, data: allQuestions };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const getQuestionById = async (id: string) => {
  try {
    const question = await prismaClient.questions.findUnique({ where: { id } });
    console.log(`successfully got question: ${question}`);
    return { success: true, data: question };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const updateQuestion = async (id: string, question: Questions) => {
  try {
    const updatedQuestion = await prismaClient.questions.update({
      where: { id },
      data: question,
    });
    console.log(`successfully updated question: ${updatedQuestion}`);
    return { success: true, data: updatedQuestion };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};

export const deleteQuestion = async (id: string) => {
  try {
    const deletedQuestion = await prismaClient.questions.delete({
      where: { id },
    });
    console.log(`successfully deleted question: ${deletedQuestion}`);
    return { success: true, data: deletedQuestion };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};
