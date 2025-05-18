import { endOfMonth, startOfMonth, startOfWeek, endOfWeek } from 'date-fns';

export function getVisibleRange(firstDayCurrentMonth: Date) {
    return {
        start: startOfWeek(startOfMonth(firstDayCurrentMonth)),
        end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
    };
}
