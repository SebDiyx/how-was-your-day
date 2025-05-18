import { api } from '@/trpc/react';
import { getVisibleRange } from './utils';
import { CalendarDays } from './calendar-days';

type CalendarLoaderProps = {
    firstDayCurrentMonth: Date;
};

export function DairyEntryCalendarLoader({
    firstDayCurrentMonth,
}: CalendarLoaderProps) {
    const visibleRange = getVisibleRange(firstDayCurrentMonth);
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
            firstDayCurrentMonth={firstDayCurrentMonth}
        />
    );
}
