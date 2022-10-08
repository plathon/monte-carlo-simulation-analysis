// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import { userRoutes } from "./user";
import { tradeRoutes } from "./trade";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("auth.", protectedExampleRouter)
  .merge("user.", userRoutes)
  .merge("trade.", tradeRoutes);

// export type definition of API
export type AppRouter = typeof appRouter;
