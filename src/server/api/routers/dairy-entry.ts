import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import {
    diaryEntryInsertSchema,
    diaryEntryUpdateSchema,
} from '@/server/db/schema';

export const dairyEntryRouter = createTRPCRouter({
    create: publicProcedure
        .input(diaryEntryInsertSchema.omit({ user: true }))
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.getCurrentUserId();
            const result = await ctx.diaryEntryRepository.create(input, userId);
            return result;
        }),

    update: publicProcedure
        .input(diaryEntryUpdateSchema)
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.getCurrentUserId();
            const result = await ctx.diaryEntryRepository.update(input, userId);
            return result;
        }),

    upsert: publicProcedure
        .input(
            z.object({
                id: z.number().optional(),
                rating: z.number(),
                description: z.string(),
                date: z.date(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.getCurrentUserId();
            const result = await ctx.diaryEntryRepository.upsert(input, userId);
            return result;
        }),

    delete: publicProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.getCurrentUserId();
            const result = await ctx.diaryEntryRepository.deleteById(
                input.id,
                userId,
            );
            return result;
        }),

    getMany: publicProcedure
        .input(
            z.object({
                startDate: z.date(),
                endDate: z.date(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const userId = ctx.getCurrentUserId();
            const entries = await ctx.diaryEntryRepository.findManyByDateRange(
                input.startDate,
                input.endDate,
                userId,
            );
            return entries;
        }),
});
