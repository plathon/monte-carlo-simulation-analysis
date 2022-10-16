import { z } from "zod";
import { createProtectedRouter } from "../context";

export const workspaceRoutes = createProtectedRouter()
  .query("list", {
    async resolve({ ctx }) {
      const {
        prisma,
        session: { user },
      } = ctx;
      return await prisma.workspace.findMany({
        where: {
          ownerId: user.id,
        },
      });
    },
  })
  .mutation("create", {
    input: z.object({
      name: z.string().min(3).max(14),
    }),
    async resolve({ ctx, input }) {
      const {
        prisma,
        session: { user },
      } = ctx;
      const { name } = input;
      return await prisma.workspace.create({
        data: {
          name,
          owner: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    },
  });
