import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { dairyEntryTable } from './schema';
import { db } from '.';
import { startOfDay } from 'date-fns';

async function main() {
    const now = startOfDay(new Date());

    const dairyEntry: typeof dairyEntryTable.$inferInsert = {
        user: 'Test User', // TODO: Update when auth is set up
        date: now,
        rating: 0,
        description: '',
    };

    await db.insert(dairyEntryTable).values(dairyEntry);

    const dairyEntries = await db.select().from(dairyEntryTable);
    console.log('Getting all dairy entries from the database: ', dairyEntries);

    await db
        .update(dairyEntryTable)
        .set({
            rating: 1,
        })
        .where(eq(dairyEntryTable.user, dairyEntry.user));

    console.log('Dairy entry updated!');

    // await db.delete(dairy).where(eq(dairy.user, dairyEntry.user));
    // console.log('Dairy entry deleted!');
}

await main();
