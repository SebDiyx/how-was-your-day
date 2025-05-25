import { api } from '@/trpc/react';
import { getVisibleRange } from './utils';
import { DairyEntryCalendarDays } from './dairy-entry-calendar-days';

type DairyEntryCalendarLoaderProps = {
    currentMonth: Date;
};

export function DairyEntryCalendarLoader({
    currentMonth,
}: DairyEntryCalendarLoaderProps) {
    const visibleRange = getVisibleRange(currentMonth);

    const { data: diaryEntries, isLoading } = api.dairyEntry.getMany.useQuery({
        startDate: visibleRange.start,
        endDate: visibleRange.end,
    });

    if (isLoading) {
        // TODO: Skeleton loader for the calendar days
        return <div>Loading...</div>;
    }

    return (
        <DairyEntryCalendarDays
            diaryEntries={diaryEntries ?? []}
            currentMonth={currentMonth}
        />
    );
}
