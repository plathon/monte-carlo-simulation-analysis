import { createProtectedRouter } from "../context";
import { z } from "zod";

export const userRoutes = createProtectedRouter().mutation("updateData", {
  input: z.object({ name: z.string().min(5) }),
  async resolve({ ctx, input }) {
    const { name } = input;
    console.log(name);
    return { returned: "data" };
  },
});
