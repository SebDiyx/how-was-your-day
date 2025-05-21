'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { add, format, startOfDay, startOfMonth } from 'date-fns';
import { DairyEntryCalendarLoader } from './calendar-loader';

export function Calendar() {
    const today = startOfDay(new Date());
    const [currentMonth, setCurrentMonth] = useState(startOfMonth(today));

    function previousMonth() {
        const previousMonth = add(currentMonth, { months: -1 });
        setCurrentMonth(previousMonth);
    }

    function nextMonth() {
        const nextMonth = add(currentMonth, { months: 1 });
        setCurrentMonth(nextMonth);
    }

    return (
        <>
            <div className="w-full rounded-2xl border border-amber-200 bg-gradient-to-b from-amber-50 to-white p-6 shadow-inner">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="ml-2 flex items-center text-2xl font-bold text-amber-800">
                        {format(currentMonth, 'MMMM yyyy')}
                    </h2>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={previousMonth}
                            className="rounded-full border-amber-300 hover:bg-amber-100 hover:text-amber-800"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={nextMonth}
                            className="rounded-full border-amber-300 hover:bg-amber-100 hover:text-amber-800"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                <div className="mb-2 grid grid-cols-7 gap-1 text-center font-medium">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                        (day) => (
                            <div
                                key={day}
                                className="rounded-lg bg-amber-100 py-2 text-sm text-amber-800"
                            >
                                {day}
                            </div>
                        ),
                    )}
                </div>
                <DairyEntryCalendarLoader currentMonth={currentMonth} />
            </div>
        </>
    );
}
