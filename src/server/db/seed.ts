import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { dairyEntryTable } from './schema';
import { db } from '.';
import { getStartOfDay } from '@/lib/dateUtils';

async function main() {
    const now = new Date();

    const dairyEntry: typeof dairyEntryTable.$inferInsert = {
        user: 'Test', // TODO: Update when auth is set up
        date: getStartOfDay(now),
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

main();
