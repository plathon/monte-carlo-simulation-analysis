import { createProtectedRouter } from "../context";
import { z } from "zod";

export const tradeRoutes = createProtectedRouter()
  .query("list", {
    async resolve({ ctx }) {
      const {
        prisma,
        session: { user },
      } = ctx;
      const workspace = await prisma.workspace.findUnique({
        where: {
          id: "cl8z6e1mu0052ckaperl48zzy",
        },
      });
      return await prisma.trade.findMany({
        where: { workspaceId: workspace?.id },
      });
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
  });
