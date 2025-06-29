import { emotionsData } from "@/lib/emotions"
import { EmotionType } from "@/types/emotions"
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { emotionStore } from "@/stores/emotionSore";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";

export const EmotionCard = observer(({ type, comment, id, isDragging = false }: { type: EmotionType; comment: string; id: string; isDragging?: boolean }) => {
    const emotionInfo = emotionsData[type];
    const [isMobile, setIsMobile] = useState(false);

    const x = useMotionValue(0);
    const opacity = useTransform(x, [-150, 0], [0.3, 1]);
    const scale = useTransform(x, [-150, 0], [0.8, 1]);
    const deleteIconOpacity = useTransform(x, [-100, 0], [1, 0]);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const swipeThreshold = -100;

        if (info.offset.x < swipeThreshold) {
            emotionStore.removeEmotion(id);
        } else {
            x.set(0);
        }
    };

    const dragConstraints = {
        left: -200,
        right: 0,
        top: 0,
        bottom: 0
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                x: 0
            }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{
                duration: 0.3,
                ease: "easeOut"
            }}
            whileHover={!isMobile ? { scale: 1.05 } : {}}
            whileTap={{ scale: 0.98 }}
            className="relative cursor-pointer"
        >
            <motion.div
                drag={isMobile && !isDragging ? "x" : false}
                dragConstraints={dragConstraints}
                dragElastic={0.1}
                onDragEnd={handleDragEnd}
                style={{
                    x: isMobile && !isDragging ? x : 0,
                    opacity: isMobile && !isDragging ? opacity : 1,
                    scale: isMobile && !isDragging ? scale : 1
                }}
                className="relative"
            >
                <Card className={cn("shadow-lg p-4 min-h-[150px] flex flex-row w-full justify-between items-start transition-all duration-200", emotionInfo?.activeStyles, isDragging && "shadow-2xl")}>
                    <div className="flex items-start gap-4">
                        <p className="text-4xl">{emotionInfo?.icon}</p>
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold text-black">{emotionInfo?.name}</p>
                            <p className="text-sm text-gray-500">{comment}</p>
                        </div>
                    </div>

                    {!isMobile && (
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => emotionStore.removeEmotion(id)}
                        >
                            <Trash />
                        </Button>
                    )}
                </Card>

                {isMobile && (
                    <motion.div
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500"
                        style={{
                            opacity: deleteIconOpacity
                        }}
                    >
                        <Trash size={24} />
                    </motion.div>
                )}
            </motion.div>

            {isMobile && (
                <motion.div
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-2 right-2 text-xs text-gray-400 pointer-events-none"
                >
                    ← Swipe to delete
                </motion.div>
            )}
        </motion.div>
    );
});