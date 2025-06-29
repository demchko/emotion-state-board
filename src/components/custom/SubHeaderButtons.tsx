"use client";
import { Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import Image from "next/image"
import { AddEmotionModal } from "./AddEmotionModal"
import { ModeToggle } from "./ThemeToggle"
import { motion } from "framer-motion";
import { StatsModal } from "./StatModal";
import { emotionStore } from "@/stores/emotionSore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

export const SubHeaderButtons = observer(() => {
    useEffect(() => {
        emotionStore.hydrate();
    }, []);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between"
        >
            <Image src="https://cdn-icons-png.flaticon.com/512/6911/6911451.png" alt="Logo" width={100} height={100} />
            <div className="flex flex-col sm:flex-row gap-4" >
                <AddEmotionModal />
                {
                    emotionStore.isReady && (
                        <StatsModal />
                    )
                }
                {emotionStore.isReady && (
                    <Button
                        variant="outline"
                        onClick={() => emotionStore.clearAllEmotions()}
                        disabled={emotionStore.emotions.length === 0}
                    >
                        <Trash2 />
                        Очистити все
                    </Button>
                )}
                <ModeToggle />
            </div>
        </motion.div >
    )
})