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
      return await prisma.workspace.findFirst({
        where: {
          AND: [{ id: workspaceId }, { ownerId: user.id }],
        },
        include: {
          trades: {
            include: {
              symbol: true,
            },
            orderBy: {
              id: "desc",
            },
          },
        },
      });
    },
  })
  .mutation("create", {
    input: z.object({
      symbol: z.string(),
      open_price: z.number(),
      close_price: z.number(),
      begin_at: z.date().optional(),
      end_at: z.date().optional(),
      side: z.enum(["BUY", "SELL"]),
      workspace: z.string().cuid(),
    }),
    async resolve({ ctx, input }) {
      const {
        prisma,
        session: { user },
      } = ctx;
      const { workspace, symbol, ...rest } = input;
      const workspaceData = await prisma.workspace.findFirst({
        where: {
          AND: [{ id: workspace }, { ownerId: user.id }],
        },
      });
      if (workspaceData) {
        const r = await prisma.trade.create({
          data: {
            ...rest,
            workspace: {
              connect: {
                id: workspaceData.id,
              },
            },
            symbol: {
              connect: {
                id: symbol,
              },
            },
          },
        });
        return r;
      }
      return false;
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
      const workspace = await prisma.trade
        .findUnique({ where: { id } })
        .workspace();
      if (workspace?.ownerId === user.id) {
        return await prisma.trade.delete({
          where: {
            id,
          },
        });
      }
      return false;
    },
  });
