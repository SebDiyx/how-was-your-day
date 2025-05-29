import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { getRatingColor } from '../dairy-entry-calendar/utils';

interface MoodEntry {
    date: string;
    rating: number;
}

interface MoodTrendChartProps {
    data: MoodEntry[];
}

export function MoodTrendChart({ data }: MoodTrendChartProps) {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis
                        dataKey="date"
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
                    <Line
                        type="monotone"
                        dataKey="rating"
                        stroke="#92400e"
                        strokeWidth={2}
                        dot={{ fill: '#92400e' }}
                        activeDot={{ r: 8, fill: '#92400e' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
