import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { dairy } from './schema';
import { db } from '.';

async function main() {
    const now = new Date();
    const dairyEntry: typeof dairy.$inferInsert = {
        user: 'Test', // TODO: Update when auth is set up
        // UTC Date with no time
        date: new Date(
            Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()),
        ),
        rating: 0,
        description: '',
    };

    await db.insert(dairy).values(dairyEntry);

    const dairyEntries = await db.select().from(dairy);
    console.log('Getting all dairy entries from the database: ', dairyEntries);

    await db
        .update(dairy)
        .set({
            rating: 1,
        })
        .where(eq(dairy.user, dairyEntry.user));
    console.log('Dairy entry updated!');

    // await db.delete(dairy).where(eq(dairy.user, dairyEntry.user));
    // console.log('Dairy entry deleted!');
}

main();
