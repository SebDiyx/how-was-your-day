"use client";

import { useState } from "react";
import { Calendar } from "@/components/calendar";
import { DayModal } from "@/components/day-modal";
import { format } from "date-fns";

// Define the day entry type
export type DayEntry = {
  date: Date;
  score: number;
  description: string;
};

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dayEntries, setDayEntries] = useState<DayEntry[]>([]);

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    setIsModalOpen(true);
  };

  const handleSaveEntry = (score: number, description: string) => {
    if (!selectedDate) return;

    // Check if there's already an entry for this date
    const existingEntryIndex = dayEntries.findIndex(
      (entry) =>
        format(entry.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
    );

    if (existingEntryIndex >= 0) {
      // Update existing entry
      const updatedEntries = [...dayEntries];
      updatedEntries[existingEntryIndex] = {
        date: selectedDate,
        score,
        description,
      };
      setDayEntries(updatedEntries);
    } else {
      // Add new entry
      setDayEntries([
        ...dayEntries,
        {
          date: selectedDate,
          score,
          description,
        },
      ]);
    }

    setIsModalOpen(false);
  };

  const getEntryForDate = (date: Date): DayEntry | undefined => {
    return dayEntries.find(
      (entry) => format(entry.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-20 bg-gradient-to-b from-amber-100 to-white">
      <h1 className="text-3xl font-bold mb-8 text-amber-800 flex items-center gap-2">
        🌻 How was your day? 🌻
      </h1>

      <div className="w-full max-w-xl">
        <Calendar onDayClick={handleDayClick} dayEntries={dayEntries} />
      </div>

      <DayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEntry}
        date={selectedDate}
        initialData={selectedDate ? getEntryForDate(selectedDate) : undefined}
      />
    </main>
  );
}
