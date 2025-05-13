'use server';

import { eq } from 'drizzle-orm';
import { db } from '../db';
import {
    dairyEntryTable,
    DiaryEntryInsert,
    diaryEntryInsertSchema,
    DiaryEntryUpdate,
    diaryEntryUpdateSchema,
} from '../db/schema';

export async function getDairyEntries() {
    const dairyEntries = await db.select().from(dairyEntryTable);
    return dairyEntries;
}

export async function createDairyEntry(input: DiaryEntryInsert) {
    const parsed = diaryEntryInsertSchema.parse(input);
    const newDairyEntry = await db.insert(dairyEntryTable).values(parsed);
    return newDairyEntry;
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
