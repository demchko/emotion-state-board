"use client";

import { useEffect, useState } from "react";
import { emotionStore } from "@/stores/emotionSore";
import { Loader2 } from "lucide-react";
import { observer } from "mobx-react-lite";
import { EmotionCard } from "./EmotionCard";
import { motion } from "framer-motion";

export const EmotionsList = observer(() => {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    if (!isHydrated) {
        return <div className="w-full py-8 flex items-center justify-center">
            <div className="flex flex-col gap-2" >
                <Loader2 className="animate-spin transition-all duration-500 w-16 h-16" />
                <p className="text-gray-400" >Loading...</p>
            </div>
        </div>;
    }

    return (
        <motion.div
            layout
            className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
            {emotionStore.emotions.map(item => (
                <EmotionCard key={item.id} type={item.type} comment={item.comment} id={item.id} />
            ))}
        </motion.div>
    );
});