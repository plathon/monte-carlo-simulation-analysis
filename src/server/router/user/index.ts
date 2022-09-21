import { createProtectedRouter } from "../context";
import { z } from "zod";

export const userRoutes = createProtectedRouter()
  .query("data", {
    async resolve({ ctx }) {
      const user = ctx.session.user;
      return user;
    },
  })
  .mutation("update", {
    input: z.object({ name: z.string().min(5) }),
    async resolve({ ctx, input }) {
      const { id } = ctx.session.user;
      const { name } = input;
      ctx.prisma.user.update({ where: { id }, data: { name } });
      return { name };
    },
  });
