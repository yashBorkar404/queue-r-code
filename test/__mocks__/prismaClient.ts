import { jest } from "@jest/globals";
import { PrismaClient } from "@prisma/client";

const prismaMock: {
  modules: {
    create: jest.MockedFunction<PrismaClient["modules"]["create"]>;
    findMany: jest.MockedFunction<PrismaClient["modules"]["findMany"]>;
    findUnique: jest.MockedFunction<PrismaClient["modules"]["findUnique"]>;
    update: jest.MockedFunction<PrismaClient["modules"]["update"]>;
    delete: jest.MockedFunction<PrismaClient["modules"]["delete"]>;
  };
} = {
  modules: {
    create: jest.fn() as unknown as jest.MockedFunction<
      PrismaClient["modules"]["create"]
    >,
    findMany: jest.fn() as jest.MockedFunction<
      PrismaClient["modules"]["findMany"]
    >,
    findUnique: jest.fn() as unknown as jest.MockedFunction<
      PrismaClient["modules"]["findUnique"]
    >,
    update: jest.fn() as unknown as jest.MockedFunction<
      PrismaClient["modules"]["update"]
    >,
    delete: jest.fn() as unknown as jest.MockedFunction<
      PrismaClient["modules"]["delete"]
    >,
  },
};

export default prismaMock;
