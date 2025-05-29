'use client';

import { CalendarDatePicker } from '@/components/ui/calendar-date-picker';
import { useState } from 'react';
import { MoodTrendChart } from '@/components/visualizations/mood-trend-chart';
import { MoodHeatmap } from '@/components/visualizations/mood-heatmap';
import { MoodStats } from '@/components/visualizations/mood-stats';
import { MoodByDay } from '@/components/visualizations/mood-by-day';

// Mock data for demonstration
const mockData = [
    { date: '2024-01-01', rating: 1 },
    { date: '2024-01-02', rating: -1 },
    { date: '2024-01-03', rating: 2 },
    { date: '2024-01-04', rating: 0 },
    { date: '2024-01-05', rating: 1 },
    // Add more mock data as needed
];

export function Visualizations() {
    const [selectedDateRange, setSelectedDateRange] = useState({
        from: new Date(new Date().getFullYear(), 0, 1),
        to: new Date(),
    });

    return (
        <div className="flex h-full flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-amber-900">
                    Mood Analytics
                </h1>
                <CalendarDatePicker
                    date={selectedDateRange}
                    onDateSelect={setSelectedDateRange}
                />
            </div>

            <MoodStats data={mockData} />

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-amber-200 bg-gradient-to-b from-amber-50 to-white p-6 shadow-inner">
                    <h2 className="mb-4 text-lg font-medium text-amber-900">
                        Mood Trend
                    </h2>
                    <MoodTrendChart data={mockData} />
                </div>

                <div className="rounded-2xl border border-amber-200 bg-gradient-to-b from-amber-50 to-white p-6 shadow-inner">
                    <h2 className="mb-4 text-lg font-medium text-amber-900">
                        Mood by Day
                    </h2>
                    <MoodByDay data={mockData} />
                </div>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-gradient-to-b from-amber-50 to-white p-6 shadow-inner">
                <h2 className="mb-4 text-lg font-medium text-amber-900">
                    Mood Distribution
                </h2>
                <MoodHeatmap data={mockData} />
            </div>
        </div>
    );
}
