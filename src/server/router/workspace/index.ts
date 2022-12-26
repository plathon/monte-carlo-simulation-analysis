import { z } from "zod";
import { createProtectedRouter } from "../context";

export const workspaceRoutes = createProtectedRouter()
  .query("list", {
    async resolve({ ctx }) {
      const {
        prisma,
        session: { user },
      } = ctx;
      const workspaces = await prisma.workspace.findMany({
        where: {
          ownerId: user.id,
        },
      });
      if (Array.isArray(workspaces) && !workspaces.length) {
        const data = await prisma.workspace.create({
          data: { name: "default", owner: { connect: { id: user.id } } },
        });
        return [data];
      }
      return workspaces;
    },
  })
  .mutation("create", {
    input: z.object({
      name: z.string().min(3).max(14),
      description: z.string().min(3).max(255).optional(),
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
