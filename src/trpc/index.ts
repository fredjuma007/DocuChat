import { router } from './trpc'

const appRouter = router({
    // ...
});

// Export type of router
// NOT the router itself
export type AppRouter = typeof appRouter;