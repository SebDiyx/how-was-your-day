import { DairyEntryCalendar } from '@/components/dairy-entry-calendar/dairy-entry-calendar';

export default function CalendarPage() {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="flex items-center gap-2 text-5xl font-bold text-amber-800">
                🌻 Calendar 🌻
            </h1>

            {/* TODO: Fix slight height overflow on March (6 rows) */}
            <div className="w-full max-w-4xl p-8">
                <DairyEntryCalendar />
            </div>
        </div>
    );
}
