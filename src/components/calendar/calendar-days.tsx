'use client';

import {
    eachDayOfInterval,
    format,
    getDay,
    isSameMonth,
    isToday,
} from 'date-fns';
import type { MinDairyEntry } from '@/app/page';
import { cn } from '@/lib/utils';
import { getVisibleRange } from './utils';
import { DairyEntryModal } from '../dairy-entry-modal';
import { useState } from 'react';

// TODO: Move to utils file
const getRatingColor = (rating: number) => {
    switch (rating) {
        case -2:
            return 'bg-amber-900/70 text-white'; // dark brown like sunflower seeds
        case -1:
            return 'bg-amber-600/70 text-white'; // darker amber
        case 0:
            return 'bg-amber-400/70 text-black'; // medium amber
        case 1:
            return 'bg-yellow-300/70 text-black'; // sunflower yellow
        case 2:
            return 'bg-yellow-300/70 text-black'; // sunflower yellow
        default:
            return '';
    }
};

interface CalendarDaysProps {
    diaryEntries: MinDairyEntry[];
    firstDayCurrentMonth: Date;
}

export function CalendarDays({
    diaryEntries,
    firstDayCurrentMonth,
}: CalendarDaysProps) {
    const visibleRange = getVisibleRange(firstDayCurrentMonth);
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
                                    !isSameMonth(day, firstDayCurrentMonth)
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
