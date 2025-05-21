import { endOfMonth, startOfMonth, startOfWeek, endOfWeek } from 'date-fns';

export function getVisibleRange(firstDayCurrentMonth: Date) {
    return {
        start: startOfWeek(startOfMonth(firstDayCurrentMonth)),
        end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
    };
}

export function getRatingColor(rating: number) {
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
}
