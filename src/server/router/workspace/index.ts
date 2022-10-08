import { createProtectedRouter } from "../context";

export const workspaceRoutes = createProtectedRouter().query("list", {
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
});
