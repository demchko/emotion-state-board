import { ChartColumn } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { observer } from "mobx-react-lite"
import { emotionStore } from "@/stores/emotionSore";
import { motion } from "framer-motion";
import { EmotionType } from "@/types/emotions";
import { emotionsData } from "@/lib/emotions";
import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const StatsModal = observer(() => {
    const totalEmotions = emotionStore.emotions.length;
    const getMoodScore = () => {
        if (totalEmotions === 0) return 0;

        const positiveEmotions = ['joy', 'love', 'surprise', 'calm'];
        const negativeEmotions = ['sadness', 'anger', 'fear'];

        let score = 0;
        emotionStore.emotions.forEach(emotion => {
            if (positiveEmotions.includes(emotion.type)) score += 1;
            else if (negativeEmotions.includes(emotion.type)) score -= 1;
        });

        return Math.round((score / totalEmotions) * 100);
    };

    const emotionCounts = emotionStore.emotions.reduce((acc, emotion) => {
        acc[emotion.type] = (acc[emotion.type] || 0) + 1;
        return acc;
    }, {} as Record<EmotionType, number>);

    const mostFrequentEmotion = Object.entries(emotionCounts)
        .sort(([, a], [, b]) => b - a)[0];

    const result = mostFrequentEmotion
        ? { type: mostFrequentEmotion[0] as EmotionType, count: mostFrequentEmotion[1] }
        : { type: null as EmotionType | null, count: 0 };

    return (
        <Dialog>
            <DialogTrigger asChild >
                <Button variant="outline" disabled={emotionStore.emotions.length === 0} >
                    <ChartColumn />
                    Статистика
                </Button >
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Статистика
                    </DialogTitle>
                    <DialogDescription>
                        Тут буде статистика по емоціям, які Ви додали.
                    </DialogDescription>
                </DialogHeader>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4">
                            <div className="flex items-center gap-3">
                                <div>
                                    <p className="text-sm text-gray-400">Настрій</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold text-gray-500">
                                            {getMoodScore() > 0 ? '+' : ''}{getMoodScore()}%
                                        </span>
                                        <span className={`text-sm px-2 py-1 rounded-full ${getMoodScore() > 20 ? 'bg-green-100 text-green-800' :
                                            getMoodScore() < -20 ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {getMoodScore() > 20 ? 'Позитивний' :
                                                getMoodScore() < -20 ? 'Негативний' : 'Нейтральний'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {result.type && (
                            <div className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="text-3xl">
                                        {emotionsData[result.type].icon}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Найчастіша емоція</p>
                                        <p className="text-lg font-bold text-gray-500">
                                            {emotionsData[result.type].name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {result.count} разів
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <ChartPieSeparatorNone emotionCounts={emotionCounts} />
                </motion.div>
            </DialogContent>
        </Dialog>
    )
});

const chartConfig = {
    count: {
        label: "Кількість",
    },
    joy: {
        label: "Радість",
        color: "var(--chart-1)",
    },
    sadness: {
        label: "Смуток",
        color: "var(--chart-2)",
    },
    anger: {
        label: "Злість",
        color: "var(--chart-3)",
    },
    surprise: {
        label: "Подив",
        color: "var(--chart-4)",
    },
    love: {
        label: "Любов",
        color: "var(--chart-5)",
    },
    fear: {
        label: "Страх",
        color: "var(--chart-6)",
    }
} satisfies ChartConfig

export function ChartPieSeparatorNone({ emotionCounts }: { emotionCounts: Record<EmotionType, number> }) {
    const chartData = Object.entries(emotionCounts).map(([emotion, count]) => ({
        emotion,
        count,
        fill: `var(--color-${emotion})`
    }));

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Статистика емоцій</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="count"
                            nameKey="emotion"
                            stroke="0"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
