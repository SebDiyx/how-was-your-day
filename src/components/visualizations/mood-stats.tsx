interface MoodEntry {
    date: string;
    rating: number;
}

interface MoodStatsProps {
    data: MoodEntry[];
}

export function MoodStats({ data }: MoodStatsProps) {
    const averageMood =
        data.reduce((acc, entry) => acc + entry.rating, 0) / data.length;

    const moodCounts = data.reduce(
        (acc, entry) => {
            acc[entry.rating] = (acc[entry.rating] || 0) + 1;
            return acc;
        },
        {} as Record<number, number>,
    );

    const mostCommonMood = Object.entries(moodCounts).sort(
        ([, a], [, b]) => b - a,
    )[0]?.[0];

    const positiveDays = data.filter((entry) => entry.rating > 0).length;
    const negativeDays = data.filter((entry) => entry.rating < 0).length;
    const neutralDays = data.filter((entry) => entry.rating === 0).length;

    const totalDays = data.length;
    const positivePercentage = (positiveDays / totalDays) * 100;
    const negativePercentage = (negativeDays / totalDays) * 100;

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-amber-200 bg-gradient-to-b from-amber-50 to-white p-4 shadow-sm">
                <h3 className="text-sm font-medium text-amber-900">
                    Average Mood
                </h3>
                <p className="mt-2 text-2xl font-semibold text-amber-800">
                    {averageMood.toFixed(1)}
                </p>
            </div>

            <div className="rounded-lg border border-amber-200 bg-gradient-to-b from-amber-50 to-white p-4 shadow-sm">
                <h3 className="text-sm font-medium text-amber-900">
                    Most Common Mood
                </h3>
                <p className="mt-2 text-2xl font-semibold text-amber-800">
                    {mostCommonMood}
                </p>
            </div>

            <div className="rounded-lg border border-amber-200 bg-gradient-to-b from-amber-50 to-white p-4 shadow-sm">
                <h3 className="text-sm font-medium text-amber-900">
                    Positive Days
                </h3>
                <p className="mt-2 text-2xl font-semibold text-amber-800">
                    {positivePercentage.toFixed(0)}%
                </p>
            </div>

            <div className="rounded-lg border border-amber-200 bg-gradient-to-b from-amber-50 to-white p-4 shadow-sm">
                <h3 className="text-sm font-medium text-amber-900">
                    Negative Days
                </h3>
                <p className="mt-2 text-2xl font-semibold text-amber-800">
                    {negativePercentage.toFixed(0)}%
                </p>
            </div>
        </div>
    );
}
