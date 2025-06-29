"use client";

import { useEffect, useState } from "react";
import { emotionStore } from "@/stores/emotionSore";
import { Loader2 } from "lucide-react";
import { observer } from "mobx-react-lite";
import { EmotionCard } from "./EmotionCard";
import { motion, Reorder } from "framer-motion";
import { Emotion } from "@/types/emotions";

export const EmotionsList = observer(() => {
    const [isHydrated, setIsHydrated] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsHydrated(true);

        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleReorder = (newOrder: Emotion[]) => {
        const currentEmotions = emotionStore.emotions;
        const newEmotions: Emotion[] = [];

        newOrder.forEach(item => {
            const emotion = currentEmotions.find(e => e.id === item.id);
            if (emotion) {
                newEmotions.push(emotion);
            }
        });

        emotionStore.emotions = newEmotions;
        emotionStore['saveToStorage']();
    };

    if (!isHydrated) {
        return <div className="w-full py-8 flex items-center justify-center">
            <div className="flex flex-col gap-2">
                <Loader2 className="animate-spin transition-all duration-500 w-16 h-16" />
                <p className="text-gray-400">Loading...</p>
            </div>
        </div>;
    }

    // console.log(isMobile)


    if (isMobile) {
        return (
            <div className="mt-4">
                <Reorder.Group
                    axis="y"
                    values={emotionStore.emotions}
                    onReorder={handleReorder}
                    className="flex flex-col gap-4"
                >
                    {emotionStore.emotions.map((item) => (
                        <Reorder.Item
                            key={item.id}
                            value={item}
                            className="cursor-grab active:cursor-grabbing"
                            whileDrag={{
                                scale: 1.05,
                                zIndex: 1000,
                                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                            }}
                            dragListener={true}
                            dragControls={undefined}
                        >
                            <EmotionCard
                                type={item.type}
                                comment={item.comment}
                                id={item.id}
                                isDragging={false}
                            />
                        </Reorder.Item>
                    ))}
                </Reorder.Group>

                {emotionStore.emotions.length > 1 && (
                    <motion.div
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0 }}
                        transition={{ delay: 3, duration: 1 }}
                        className="mt-4 text-center text-xs text-gray-400"
                    >
                        Hold and drag cards to reorder
                    </motion.div>
                )}
            </div>
        );
    }


    return (
        <motion.div
            layout
            className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6"
        >
            {emotionStore.emotions.map(item => (
                <EmotionCard
                    key={item.id}
                    type={item.type}
                    comment={item.comment}
                    id={item.id}
                    isDragging={false}
                />
            ))}
        </motion.div>
    );
});