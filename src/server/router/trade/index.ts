import { createProtectedRouter } from "../context";
import { z } from "zod";

export const tradeRoutes = createProtectedRouter()
  .query("list", {
    input: z.object({
      workspace: z.string().optional(),
    }),
    async resolve({ ctx, input: { workspace: workspaceId } }) {
      const {
        prisma,
        session: { user },
      } = ctx;
      return await prisma.workspace
        .findFirst({
          where: {
            AND: [{ id: workspaceId }, { ownerId: user.id }],
          },
        })
        .trades();
    },
  })
  .mutation("create", {
    input: z.object({
      symbol: z.string().optional(),
      open_price: z.number(),
      close_price: z.number(),
      begin_at: z.date().optional(),
      end_at: z.date().optional(),
      side: z.enum(["BUY", "SELL"]),
      // workspace: z.number().optional(),
    }),
    async resolve({ ctx, input }) {
      const {
        prisma,
        session: { user },
      } = ctx;
      return await prisma.trade.create({
        data: {
          ...input,
          workspace: {
            connect: {
              id: "cl8z6e1mu0052ckaperl48zzy",
            },
          },
        },
      });
    },
  })
  .mutation("remove", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const {
        prisma,
        session: { user },
      } = ctx;
      const { id } = input;
      return await prisma.trade.delete({
        where: {
          id: id,
        },
      });
    },
  });
