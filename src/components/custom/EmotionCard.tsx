import { emotionsData } from "@/lib/emotions"
import { EmotionType } from "@/types/emotions"
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { emotionStore } from "@/stores/emotionSore";
import { observer } from "mobx-react-lite";

export const EmotionCard = observer(({ type, comment, id }: { type: EmotionType; comment: string; id: string }) => {
    const emotionInfo = emotionsData[type];
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="relative cursor-pointer"
        >
            <Card className={cn("shadow-lg p-4 min-h-[150px] flex flex-row w-full justify-between items-start ", emotionInfo.activeStyles)} >
                <div className="flex items-start gap-4" >
                    <p className="text-4xl" >{emotionInfo.icon}</p>
                    <div className="flex flex-col gap-2" >
                        <p className="font-semibold" >{emotionInfo.name}</p>
                        <p className="text-sm text-gray-500" >{comment}</p>
                    </div>
                </div>
                <Button size="icon" variant="ghost" onClick={() => emotionStore.removeEmotion(id)} >
                    <Trash />
                </Button>
            </Card >
        </motion.div>
    )
})