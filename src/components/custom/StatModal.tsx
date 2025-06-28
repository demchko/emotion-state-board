import { ChartColumn } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { observer } from "mobx-react-lite"
import { emotionStore } from "@/stores/emotionSore";

export const StatsModal = observer(() => {
    return (
        <Dialog>
            <DialogTrigger asChild >
                <Button variant="outline" disabled={emotionStore.emotions.length === 0}>
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
            </DialogContent>
        </Dialog>
    )
});