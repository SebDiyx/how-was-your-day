import { sql } from 'drizzle-orm';
import { index, sqliteTableCreator, unique } from 'drizzle-orm/sqlite-core';

export const createTable = sqliteTableCreator((name) => `hwyd_${name}`);

export const dairy = createTable(
    'dairy',
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
