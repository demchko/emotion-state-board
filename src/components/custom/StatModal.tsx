import { ChartColumn } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"

export const StatsModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild >
                <Button variant="outline">
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
}