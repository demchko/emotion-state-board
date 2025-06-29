"use client";
import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Label } from "../ui/label"
import { emotionsData } from "@/lib/emotions"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { emotionStore } from "@/stores/emotionSore";
import { EmotionType } from "@/types/emotions";

export const AddEmotionModal = () => {
    const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);
    const [comment, setComment] = useState<string>("");
    const [openModal, setOpenModal] = useState<boolean>(false);

    const handleSubmit = () => {
        if (!selectedEmotion) return;
        emotionStore.addEmotion(selectedEmotion, comment);
        setSelectedEmotion(null);
        setComment("");
        setOpenModal(false);
    }

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal} >
            <DialogTrigger asChild>
                <Button >
                    <Plus />
                    Добавити емоцію
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] max-w-[95vw] sm:max-w-md flex flex-col">
                <DialogHeader className="flex-shrink-0">
                    <DialogTitle>Додайте вашу емоцію</DialogTitle>
                    <DialogDescription>
                        Оберіть емоцію, яка найкраще відображає ваш стан на даний момент.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto min-h-0">
                    <Label className="text-sm font-semibold mb-4 block" >Виберіть вашу емоцію</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4" >
                        {
                            Object.entries(emotionsData).map(([key, emotion]) => (
                                <motion.button
                                    onClick={() => setSelectedEmotion(key as EmotionType)}
                                    key={key}
                                    className={cn(
                                        "bg-white relative h-16 cursor-pointer flex items-center justify-center gap-2 rounded-lg border",
                                        selectedEmotion === key
                                            ? emotion.activeStyles
                                            : `border-1 hover:bg-gray-100 ${emotion.borderColor}`
                                    )}
                                    // whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="button"
                                >
                                    <div className={cn("absolute w-3 h-3 rounded-full top-2 left-2", emotion.color)} />
                                    <span className="text-2xl">{emotion.icon}</span>
                                    <span className="text-xs sm:text-sm text-black">{emotion.name}</span>
                                </motion.button>
                            ))
                        }
                    </div>
                    {selectedEmotion && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="min-h-0"
                        >
                            <Label className="text-sm font-semibold mb-1 block">
                                Коментар (необов&apos;язково)
                            </Label>
                            <Textarea
                                placeholder="Розкажіть більше про вашу емоцію..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="min-h-[60px] max-h-[120px] resize-none"
                                maxLength={200}
                            />
                            <div className="text-xs text-gray-500 mt-1 text-right">
                                {comment.length}/200
                            </div>
                        </motion.div>
                    )}
                </div>
                <DialogFooter className="w-full flex-col sm:flex-row gap-2" >
                    <DialogClose asChild>
                        <Button className="w-full sm:w-1/2" variant="outline" >
                            Скасувати
                        </Button>
                    </DialogClose>
                    <Button className="w-full sm:w-1/2" onClick={handleSubmit} >Зберегти</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}