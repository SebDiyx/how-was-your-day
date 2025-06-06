'use client';

import {
    eachDayOfInterval,
    format,
    getDay,
    isAfter,
    isBefore,
    isSameMonth,
    isToday,
    subDays,
} from 'date-fns';
import type { MinDairyEntry } from '@/components/diary-entry-modal/types';
import { cn } from '@/lib/utils';
import {
    getRatingColor,
    getVisibleRange,
} from '@/components/dairy-entry-calendar/utils';
import { DairyEntryModal } from '@/components/diary-entry-modal/dairy-entry-modal';
import { useState } from 'react';
import { Button } from '../ui/button';

interface DairyEntryCalendarDaysProps {
    diaryEntries: MinDairyEntry[];
    currentMonth: Date;
}

export function DairyEntryCalendarDays({
    diaryEntries,
    currentMonth,
}: DairyEntryCalendarDaysProps) {
    const visibleRange = getVisibleRange(currentMonth);
    const visibleDays = eachDayOfInterval(visibleRange);

    const today = new Date();
    const sevenDaysAgo = subDays(today, 7);
    function isDateSelectable(date: Date): boolean {
        return !isAfter(date, today) && !isBefore(date, sevenDaysAgo);
    }

    const getDiaryEntry = (day: Date): MinDairyEntry | undefined => {
        return diaryEntries.find(
            (entry) =>
                format(entry.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'),
        );
    };

    const [modalData, setModalData] = useState<{
        date: Date;
        initialData?: MinDairyEntry;
    } | null>(null);
    const isModalOpen = !!modalData;

    return (
        <>
            <div className="mt-2 grid grid-cols-7 gap-2">
                {visibleDays.map((day, dayIdx) => {
                    const dayEntry = getDiaryEntry(day);

                    return (
                        <div
                            key={day.toString()}
                            className={cn(
                                'aspect-square',
                                dayIdx === 0 && `col-start-${getDay(day) + 1}`,
                            )}
                        >
                            <Button
                                disabled={!isDateSelectable(day)}
                                onClick={() =>
                                    setModalData({
                                        date: day,
                                        initialData: dayEntry,
                                    })
                                }
                                className={cn(
                                    'flex h-full w-full flex-col items-center justify-start rounded-xl border p-2 transition',
                                    !isSameMonth(day, currentMonth)
                                        ? 'bg-white/50 text-gray-300 opacity-50 hover:bg-amber-100'
                                        : 'bg-white text-amber-900 shadow-sm hover:bg-amber-100',
                                    isToday(day) &&
                                        !dayEntry &&
                                        'border-green-500 bg-green-50 font-bold',
                                    isToday(day) &&
                                        dayEntry &&
                                        `border-2 border-green-500 font-bold ${getRatingColor(
                                            dayEntry.rating,
                                        )}`,
                                    dayEntry &&
                                        !isToday(day) &&
                                        getRatingColor(dayEntry.rating),
                                    'disabled:opacity-40',
                                )}
                            >
                                <time
                                    dateTime={format(day, 'yyyy-MM-dd')}
                                    className="font-medium"
                                >
                                    {format(day, 'd')}
                                </time>
                                {dayEntry && (
                                    <div className="mt-auto flex h-6 w-6 items-center justify-center rounded-full bg-white/80 text-xs font-bold text-black">
                                        {dayEntry.rating}
                                    </div>
                                )}
                            </Button>
                        </div>
                    );
                })}
            </div>

            {isModalOpen && (
                <DairyEntryModal
                    isOpen={isModalOpen}
                    onClose={() => setModalData(null)}
                    date={modalData.date}
                    initialData={modalData.initialData}
                />
            )}
        </>
    );
}
