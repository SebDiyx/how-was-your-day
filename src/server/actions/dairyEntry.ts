'use server';

import { eq } from 'drizzle-orm';
import { db } from '../db';
import {
    dairyEntryTable,
    type DiaryEntryInsert,
    diaryEntryInsertSchema,
    type DiaryEntryUpdate,
    diaryEntryUpdateSchema,
} from '../db/schema';

export async function createDairyEntry(input: DiaryEntryInsert) {
    try {
        const parsed = diaryEntryInsertSchema.parse(input);
        const res = await db.insert(dairyEntryTable).values(parsed);

        return {
            success: true,
            // data: res., // TODO: Should we return the inserted row?
            message: 'Dairy entry created successfully',
        };
    } catch (error) {
        console.error('ERROR', error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : 'Unknown error occurred',
            message: 'Failed to create dairy entry',
        };
    }
}

export async function updateDairyEntry(input: DiaryEntryUpdate) {
    const parsed = diaryEntryUpdateSchema.parse(input);
    const updatedDairyEntry = await db
        .update(dairyEntryTable)
        .set(parsed)
        .where(eq(dairyEntryTable.id, parsed.id));
    return updatedDairyEntry;
}

export async function deleteDairyEntry(idToDelete: number) {
    const deletedDairyEntry = await db
        .delete(dairyEntryTable)
        .where(eq(dairyEntryTable.id, idToDelete));
    return deletedDairyEntry;
}
