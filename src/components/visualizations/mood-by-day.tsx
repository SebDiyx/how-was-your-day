import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface MoodEntry {
    date: string;
    rating: number;
}

interface MoodByDayProps {
    data: MoodEntry[];
}

export function MoodByDay({ data }: MoodByDayProps) {
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];

    const moodByDay = data.reduce(
        (acc, entry) => {
            const day = new Date(entry.date).getDay();
            if (!acc[day]) {
                acc[day] = { sum: 0, count: 0 };
            }
            acc[day].sum += entry.rating;
            acc[day].count += 1;
            return acc;
        },
        {} as Record<number, { sum: number; count: number }>,
    );

    const chartData = days.map((day, index) => ({
        day,
        average: moodByDay[index]
            ? moodByDay[index].sum / moodByDay[index].count
            : 0,
    }));

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis
                        dataKey="day"
                        stroke="#92400e"
                        tick={{ fill: '#92400e' }}
                    />
                    <YAxis
                        domain={[-2, 2]}
                        stroke="#92400e"
                        tick={{ fill: '#92400e' }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fef3c7',
                            border: '1px solid #fbbf24',
                            borderRadius: '0.5rem',
                        }}
                    />
                    <Bar
                        dataKey="average"
                        fill="#92400e"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
