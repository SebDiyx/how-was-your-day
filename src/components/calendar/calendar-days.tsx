'use client';

import {
    eachDayOfInterval,
    format,
    getDay,
    isSameMonth,
    isToday,
} from 'date-fns';
import type { MinDairyEntry } from '@/components/diary-entry-modal/types';
import { cn } from '@/lib/utils';
import { getRatingColor, getVisibleRange } from '@/components/calendar/utils';
import { DairyEntryModal } from '@/components/diary-entry-modal/dairy-entry-modal';
import { useState } from 'react';

interface CalendarDaysProps {
    diaryEntries: MinDairyEntry[];
    currentMonth: Date;
}

export function CalendarDays({
    diaryEntries,
    currentMonth,
}: CalendarDaysProps) {
    const visibleRange = getVisibleRange(currentMonth);
    const visibleDays = eachDayOfInterval(visibleRange);

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
                            {/* TODO: Pointer cursor on hover */}
                            <button
                                type="button"
                                onClick={() =>
                                    setModalData({
                                        date: day,
                                        initialData: dayEntry,
                                    })
                                }
                                className={cn(
                                    'flex h-full w-full flex-col items-center justify-start rounded-xl border p-2 transition',
                                    !isSameMonth(day, currentMonth)
                                        ? 'bg-white/50 text-amber-300 opacity-50 hover:bg-amber-50'
                                        : 'bg-white text-amber-900 shadow-sm hover:bg-amber-50',
                                    isToday(day) &&
                                        !dayEntry &&
                                        'border-green-500 bg-green-50 font-bold',
                                    isToday(day) &&
                                        dayEntry &&
                                        `border-green-500 font-bold ${getRatingColor(
                                            dayEntry.rating,
                                        )}`,
                                    dayEntry &&
                                        !isToday(day) &&
                                        getRatingColor(dayEntry.rating),
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
                            </button>
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
