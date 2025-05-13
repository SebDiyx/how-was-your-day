import { sql } from 'drizzle-orm';
import { index, sqliteTableCreator, unique } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { z } from 'zod';

export const createTable = sqliteTableCreator((name) => `hwyd_${name}`);

export const dairyEntryTable = createTable(
    'dairy_entry',
    (d) => ({
        id: d.integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),

        // TODO: User relation when auth is set up?
        user: d.text({ length: 256 }).notNull(),

        date: d.integer({ mode: 'timestamp' }).notNull(),
        rating: d.integer({ mode: 'number' }).notNull(),
        description: d.text({ length: 1024 }),

        createdAt: d
            .integer({ mode: 'timestamp' })
            .default(sql`(unixepoch())`)
            .notNull(),
        updatedAt: d.integer({ mode: 'timestamp' }).$onUpdate(() => new Date()),
    }),
    (t) => [
        index('user_date_idx').on(t.user, t.date),
        unique('user_date_unique').on(t.user, t.date),
    ],
);

export const diaryEntryInsertSchema = createInsertSchema(dairyEntryTable);

// Id technically isn't needed for update, but it's added to make the type
// inference work correctly.
export const diaryEntryUpdateSchema = createUpdateSchema(
    dairyEntryTable,
).extend({
    id: z.number().int().positive(),
});

export type DiaryEntryInsert = z.infer<typeof diaryEntryInsertSchema>;
export type DiaryEntryUpdate = z.infer<typeof diaryEntryUpdateSchema>;
