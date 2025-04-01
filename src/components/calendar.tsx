"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameMonth,
  isToday,
  parse,
  startOfMonth,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import type { DayEntry } from "@/app/page";
import { cn } from "@/lib/utils";

interface CalendarProps {
  onDayClick: (day: Date) => void;
  dayEntries: DayEntry[];
}

export function Calendar({ onDayClick, dayEntries }: CalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(firstDayCurrentMonth)),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  function previousMonth() {
    const firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayPreviousMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  const getScoreColor = (score: number) => {
    switch (score) {
      case -2:
        return "bg-amber-900 text-white"; // dark brown like sunflower seeds
      case -1:
        return "bg-amber-600 text-white"; // darker amber
      case 0:
        return "bg-amber-400 text-black"; // medium amber
      case 1:
        return "bg-yellow-300 text-black"; // sunflower yellow
      case 2:
        return "bg-yellow-300 text-black"; // sunflower yellow
      default:
        return "";
    }
  };

  const getDayEntry = (day: Date): DayEntry | undefined => {
    return dayEntries.find(
      (entry) => format(entry.date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
    );
  };

  return (
    <div className="w-full bg-gradient-to-b from-amber-50 to-white p-6 rounded-2xl border border-amber-200 shadow-inner">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-amber-800 flex items-center ml-2">
          {format(firstDayCurrentMonth, "MMMM yyyy")}
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
      <div className="grid grid-cols-7 gap-1 text-center font-medium mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div
            key={day}
            className="text-amber-800 bg-amber-100 py-2 rounded-lg text-sm"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-2">
        {days.map((day, dayIdx) => {
          const dayEntry = getDayEntry(day);

          return (
            <div
              key={day.toString()}
              className={cn(
                "aspect-square",
                dayIdx === 0 && `col-start-${getDay(day) + 1}`
              )}
            >
              <button
                type="button"
                onClick={() => onDayClick(day)}
                className={cn(
                  "flex h-full w-full flex-col items-center justify-start rounded-xl border p-2 transition",
                  !isSameMonth(day, firstDayCurrentMonth)
                    ? "text-amber-300 opacity-50 bg-white/50 hover:bg-amber-50"
                    : "text-amber-900 hover:bg-amber-50 bg-white shadow-sm",
                  isToday(day) &&
                    !dayEntry &&
                    "border-green-500 font-bold bg-green-50",
                  isToday(day) &&
                    dayEntry &&
                    `border-green-500 font-bold ${getScoreColor(
                      dayEntry.score
                    )}`,
                  dayEntry && !isToday(day) && getScoreColor(dayEntry.score)
                )}
              >
                <time
                  dateTime={format(day, "yyyy-MM-dd")}
                  className="font-medium"
                >
                  {format(day, "d")}
                </time>
                {dayEntry && (
                  <div className="mt-auto flex items-center justify-center w-6 h-6 rounded-full bg-white/80 text-xs font-bold">
                    {dayEntry.score}
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
