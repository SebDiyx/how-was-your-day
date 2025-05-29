import { api } from '@/trpc/react';
import { getVisibleRange } from './utils';
import { DairyEntryCalendarDays } from './dairy-entry-calendar-days';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { eachDayOfInterval } from 'date-fns';

type DairyEntryCalendarLoaderProps = {
    currentMonth: Date;
};

function DairyEntryCalendarSkeleton({ currentMonth }: { currentMonth: Date }) {
    const visibleRange = getVisibleRange(currentMonth);
    const visibleDays = eachDayOfInterval(visibleRange);

    return (
        <>
            <div className="mt-2 grid grid-cols-7 gap-2">
                {visibleDays.map((_, index) => (
                    <Skeleton
                        key={index}
                        className={cn(
                            'aspect-square rounded-xl',
                            index === 0 && 'col-start-1',
                        )}
                    />
                ))}
            </div>
        </>
    );
}

export function DairyEntryCalendarLoader({
    currentMonth,
}: DairyEntryCalendarLoaderProps) {
    const visibleRange = getVisibleRange(currentMonth);

    const { data: diaryEntries, isLoading } = api.dairyEntry.getMany.useQuery({
        startDate: visibleRange.start,
        endDate: visibleRange.end,
    });

    if (isLoading) {
        return <DairyEntryCalendarSkeleton currentMonth={currentMonth} />;
    }

    return (
        <DairyEntryCalendarDays
            diaryEntries={diaryEntries ?? []}
            currentMonth={currentMonth}
        />
    );
}
