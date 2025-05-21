import { Calendar } from '@/components/calendar/calendar';

export default function CalendarPage() {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="mb-3 flex items-center gap-2 text-5xl font-bold text-amber-800">
                🌻 Calendar 🌻
            </h1>

            <div className="w-full max-w-4xl p-8">
                <Calendar />
            </div>
        </div>
    );
}
