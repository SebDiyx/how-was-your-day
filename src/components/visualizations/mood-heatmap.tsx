import { getRatingColor } from '../dairy-entry-calendar/utils';

interface MoodEntry {
    date: string;
    rating: number;
}

interface MoodHeatmapProps {
    data: MoodEntry[];
}

export function MoodHeatmap({ data }: MoodHeatmapProps) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    // Create a map of date to rating
    const moodMap = new Map(data.map((entry) => [entry.date, entry.rating]));

    return (
        <div className="w-full overflow-x-auto">
            <div className="min-w-[800px]">
                <div className="mb-2 flex justify-end">
                    {months.map((month) => (
                        <div
                            key={month}
                            className="w-16 text-center text-sm text-amber-900"
                        >
                            {month}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-12 gap-1">
                    {days.map((day) => (
                        <div key={day} className="text-sm text-amber-900">
                            {day}
                        </div>
                    ))}
                    {Array.from({ length: 7 * 12 }, (_, i) => {
                        const day = i % 7;
                        const month = Math.floor(i / 7);
                        const date = new Date(2024, month, day + 1)
                            .toISOString()
                            .split('T')[0];
                        const rating = moodMap.get(date) ?? null;

                        return (
                            <div
                                key={i}
                                className={`h-8 w-8 rounded-sm ${
                                    rating !== null
                                        ? getRatingColor(rating)
                                        : 'bg-gray-100'
                                }`}
                                title={`${date}: ${rating !== null ? rating : 'No entry'}`}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
