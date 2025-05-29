import { and, eq, gte, lte } from 'drizzle-orm';
import { type db as DbType } from '@/server/db';
import {
    dairyEntryTable,
    type DiaryEntryInsert,
    type DiaryEntryUpdate,
} from '@/server/db/schema';

export type DiaryEntryRepository = ReturnType<
    typeof createDiaryEntryRepository
>;

export const createDiaryEntryRepository = (db: typeof DbType) => {
    const create = async (
        input: Omit<DiaryEntryInsert, 'user'>,
        userId: string,
    ) => {
        const result = await db
            .insert(dairyEntryTable)
            .values({
                ...input,
                user: userId,
            })
            .returning();

        return result[0];
    };

    const update = async (input: DiaryEntryUpdate, userId: string) => {
        const result = await db
            .update(dairyEntryTable)
            .set({
                ...input,
                updatedAt: new Date(),
            })
            .where(
                and(
                    eq(dairyEntryTable.id, input.id),
                    eq(dairyEntryTable.user, userId),
                ),
            )
            .returning();

        return result[0];
    };

    const upsert = async (
        input: {
            id?: number;
            rating: number;
            description: string;
            date: Date;
        },
        userId: string,
    ) => {
        if (input.id) {
            const result = await db
                .update(dairyEntryTable)
                .set({
                    ...input,
                    user: userId,
                    updatedAt: new Date(),
                })
                .where(
                    and(
                        eq(dairyEntryTable.id, input.id),
                        eq(dairyEntryTable.user, userId),
                    ),
                )
                .returning();

            console.log(result[0]);

            return result[0];
        } else {
            const result = await db
                .insert(dairyEntryTable)
                .values({
                    ...input,
                    user: userId,
                })
                .returning();

            return result[0];
        }
    };

    const deleteById = async (id: number, userId: string) => {
        const result = await db
            .delete(dairyEntryTable)
            .where(
                and(
                    eq(dairyEntryTable.id, id),
                    eq(dairyEntryTable.user, userId),
                ),
            )
            .returning();

        return result[0];
    };

    const findManyByDateRange = async (
        startDate: Date,
        endDate: Date,
        userId: string,
    ) => {
        const entries = await db.query.dairyEntryTable.findMany({
            where: (dairyEntryTable) =>
                and(
                    eq(dairyEntryTable.user, userId),
                    gte(dairyEntryTable.date, startDate),
                    lte(dairyEntryTable.date, endDate),
                ),
            orderBy: (dairyEntryTable, { asc }) => [asc(dairyEntryTable.date)],
        });

        return entries;
    };

    return {
        create,
        update,
        upsert,
        deleteById,
        findManyByDateRange,
    };
};
