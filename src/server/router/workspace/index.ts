import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createProtectedRouter } from "../context";
import { workspaceNameRegex } from "../../../regex";

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
      name: z
        .string()
        .min(3)
        .max(14)
        .regex(workspaceNameRegex)
        .trim()
        .transform((value) => value.toLocaleLowerCase()),
      description: z.string().max(255).optional(),
    }),
    async resolve({ ctx, input }) {
      const {
        prisma,
        session: { user },
      } = ctx;
      const { name } = input;
      const workspaceData = await prisma.workspace.findFirst({
        where: {
          AND: [{ name: name }, { ownerId: user.id }],
        },
      });
      if (!workspaceData) {
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
      }
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Workspace already exists.",
      });
    },
  });
