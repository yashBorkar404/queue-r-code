// NOTE: not doing it now, let's do it later
import {
  createModule,
  getAllModules,
  getModuleById,
  updateModule,
  deleteModule,
} from "@/lib/db/crudModules";
import prismaMock from "@/test/__mocks__/prismaClient";
import { faker } from "@faker-js/faker";
import { Modules } from "@prisma/client";
import { jest } from "@jest/globals";

jest.mock("@/lib/prisma", () => prismaMock);

describe("Module Service Tests", () => {
  const testModule: Modules = {
    id: crypto.randomUUID(),
    name: faker.lorem.word(),
    desc: faker.lorem.sentence(),
  };

  const testModuleArray: Modules[] = [
    {
      id: crypto.randomUUID(),
      name: faker.lorem.word(),
      desc: faker.lorem.sentence(),
    },
    {
      id: crypto.randomUUID(),
      name: faker.lorem.word(),
      desc: faker.lorem.sentence(),
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("createModule - success", async () => {
    prismaMock.modules.create.mockResolvedValue(testModule);
    const result = await createModule(testModule);
    expect(prismaMock.modules.create).toHaveBeenCalledWith({
      data: testModule,
    });
    expect(result.success).toBe(true);
    expect(result.data).toEqual(testModule);
  });

  test("createModule - failure", async () => {
    prismaMock.modules.create.mockResolvedValue(null);
    const result = await createModule(testModule);
    expect(result.success).toBe(false);
  });

  test("getAllModules - success", async () => {
    prismaMock.modules.findMany.mockResolvedValue(testModuleArray);
    const result = await getAllModules();
    expect(prismaMock.modules.findMany).toHaveBeenCalledTimes(1);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(testModuleArray);
  });

  test("getAllModules - no data", async () => {
    prismaMock.modules.findMany.mockResolvedValue([]);
    const result = await getAllModules();
    expect(result.success).toBe(false);
  });

  test("getModuleById - success", async () => {
    prismaMock.modules.findUnique.mockResolvedValue(testModule);
    const result = await getModuleById("1");
    expect(prismaMock.modules.findUnique).toHaveBeenCalledWith({
      where: { id: "1" },
    });
    expect(result.success).toBe(true);
    expect(result.data).toEqual(testModule);
  });

  test("getModuleById - not found", async () => {
    prismaMock.modules.findUnique.mockResolvedValue(null);
    const result = await getModuleById("1");
    expect(result.success).toBe(false);
  });

  test("updateModule - success", async () => {
    prismaMock.modules.update.mockResolvedValue(testModule);
    const result = await updateModule("1", testModule);
    expect(prismaMock.modules.update).toHaveBeenCalledWith({
      where: { id: testModule.id },
      data: testModule,
    });
    expect(result.success).toBe(true);
    expect(result.data).toEqual(testModule);
  });

  test("updateModule - failure", async () => {
    prismaMock.modules.update.mockRejectedValue(new Error("Update failed"));
    const result = await updateModule("1", testModule);
    expect(result.success).toBe(false);
    expect(result.data).toEqual(new Error("Update failed"));
  });

  test("deleteModule - success", async () => {
    prismaMock.modules.delete.mockResolvedValue(testModule);
    const result = await deleteModule("1");
    expect(prismaMock.modules.delete).toHaveBeenCalledWith({
      where: { id: "1" },
    });
    expect(result.success).toBe(true);
    expect(result.data).toEqual(testModule);
  });

  test("deleteModule - failure", async () => {
    prismaMock.modules.delete.mockRejectedValue(new Error("Delete failed"));
    const result = await deleteModule("1");
    expect(result.success).toBe(false);
    expect(result.data).toEqual(new Error("Delete failed"));
  });
});
