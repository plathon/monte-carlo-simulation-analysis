import { createProtectedRouter } from "../context";

export const symbolRoutes = createProtectedRouter().query("list", {
  async resolve({ ctx }) {
    const { prisma } = ctx;
    return await prisma.symbol.findMany();
  },
});
