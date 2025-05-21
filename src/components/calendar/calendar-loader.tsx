import { api } from '@/trpc/react';
import { getVisibleRange } from './utils';
import { CalendarDays } from './calendar-days';

type CalendarLoaderProps = {
    currentMonth: Date;
};

export function DairyEntryCalendarLoader({
    currentMonth,
}: CalendarLoaderProps) {
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
        <CalendarDays
            diaryEntries={diaryEntries ?? []}
            currentMonth={currentMonth}
        />
    );
}
