import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { and, lte, gte, eq } from 'drizzle-orm';
import {
    dairyEntryTable,
    diaryEntryInsertSchema,
    diaryEntryUpdateSchema,
} from '@/server/db/schema';

export const dairyEntryRouter = createTRPCRouter({
    create: publicProcedure
        .input(diaryEntryInsertSchema)
        .mutation(async ({ ctx, input }) => {
            // TODO: Move this to repository layer
            const parsed = diaryEntryInsertSchema.parse(input);
            await ctx.db.insert(dairyEntryTable).values({
                ...parsed,
                user: 'Test User', // TODO: get user from request context
            });

            // TODO: return value
        }),

    update: publicProcedure
        .input(diaryEntryUpdateSchema)
        .mutation(async ({ ctx, input }) => {
            // TODO: Move this to repository layer
            const parsed = diaryEntryUpdateSchema.parse(input);
            await ctx.db
                .update(dairyEntryTable)
                .set(parsed)
                .where(
                    and(
                        eq(dairyEntryTable.id, parsed.id),
                        // Don't let users update other users' dairy entries
                        eq(dairyEntryTable.user, 'Test User'), // TODO: get user from request context
                    ),
                );

            // TODO: return value
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
            if (input.id) {
                await ctx.db
                    .update(dairyEntryTable)
                    .set({
                        ...input,
                        user: 'Test User', // TODO: get user from request context
                        updatedAt: new Date(),
                    })
                    .where(
                        and(
                            eq(dairyEntryTable.id, input.id),
                            // Don't let users update other users' dairy entries
                            eq(dairyEntryTable.user, 'Test User'), // TODO: get user from request context
                        ),
                    );
            } else {
                await ctx.db.insert(dairyEntryTable).values({
                    ...input,
                    user: 'Test User', // TODO: get user from request context
                });
            }

            // TODO: return value
        }),

    delete: publicProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ ctx, input }) => {
            // TODO: Move this to repository layer
            await ctx.db.delete(dairyEntryTable).where(
                and(
                    eq(dairyEntryTable.id, input.id),
                    // Don't let users delete other users' dairy entries
                    eq(dairyEntryTable.user, 'Test User'), // TODO: get user from request context
                ),
            );

            // TODO: return value
        }),

    getMany: publicProcedure
        .input(
            z.object({
                startDate: z.date(),
                endDate: z.date(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const dairyEntries = await ctx.db.query.dairyEntryTable.findMany({
                where: (dairyEntryTable, { eq }) =>
                    and(
                        eq(dairyEntryTable.user, 'Test User'), // TODO: get user from request context
                        gte(dairyEntryTable.date, input.startDate),
                        lte(dairyEntryTable.date, input.endDate),
                    ),
                orderBy: (dairyEntryTable, { asc }) => [
                    asc(dairyEntryTable.date),
                ],
            });

            return dairyEntries ?? null;
        }),
});
