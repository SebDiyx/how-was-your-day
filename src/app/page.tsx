'use client';

import { Calendar } from '@/components/calendar/calendar';

export type MinDairyEntry = {
    id: number;
    date: Date;
    rating: number;
    description: string | null;
};

export default function Home() {
    return (
        <>
            <h1 className="mb-8 flex items-center gap-2 text-3xl font-bold text-amber-800">
                🌻 How was your day? 🌻
            </h1>

            <div className="w-full max-w-xl">
                <Calendar />
            </div>
        </>
    );
}
