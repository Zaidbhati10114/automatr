
import { inngest } from '@/inngest/client';
import { baseProcedure, createTRPCRouter, premiumProcedure, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { workflowsRouter } from '@/features/workflows/server/routers';

export const appRouter = createTRPCRouter({
    testAi: premiumProcedure.mutation(async () => {
        await inngest.send({
            name: 'execute/ai',
        });
        return { success: true, message: 'Job Queued' }
    }),
    getWorkflows: protectedProcedure.query(({ ctx }) => {
        return prisma.workflow.findMany();
    }),
    workflows: workflowsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;