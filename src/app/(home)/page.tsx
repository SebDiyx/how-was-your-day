import { DairyEntryForm } from '@/components/diary-entry-modal/dairy-entry-form';
import { db } from '@/server/db';
import { addDays, startOfDay } from 'date-fns';
import { and, gte, lt } from 'drizzle-orm';

export default async function Home() {
    const today = startOfDay(new Date());

    const dairyEntryForToday = await db.query.dairyEntryTable.findFirst({
        where: (dairyEntry, { eq }) =>
            and(
                gte(dairyEntry.date, today),
                lt(dairyEntry.date, addDays(today, 1)),
                eq(dairyEntry.user, 'Test User'), // TODO: Get user from request context
            ),
    });

    if (!dairyEntryForToday) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <div className="w-2xl rounded-2xl border border-amber-200 bg-gradient-to-b from-amber-50 to-white p-10 shadow-inner">
                    <h1 className="mb-4 text-center text-4xl font-bold text-amber-800">
                        🌻 How was your day today? 🌻
                    </h1>
                    <DairyEntryForm date={today} />
                </div>
            </div>
        );
    }

    // If there is a dairy entry for today, show the welcome back message + general dashboard with stats
    // TODO: Visualizations
    return (
        <>
            <div className="flex h-full flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-amber-800">
                    Welcome back
                </h1>
                <h2 className="text-4xl font-bold text-amber-800">
                    🌻 {dairyEntryForToday?.user} 🌻
                </h2>
            </div>
        </>
    );
}
