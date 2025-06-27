import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"

export const AddEmotionModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button >
                    <Plus />
                    Добавити емоцію
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Додайте вашу емоцію</DialogTitle>
                    <DialogDescription>
                        Оберіть емоцію, яка найкраще відображає ваш стан на даний момент.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}