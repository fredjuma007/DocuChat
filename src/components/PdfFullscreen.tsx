import { useState } from "react"
import { Dialog, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { Expand } from "lucide-react"

const PdfFullscreen = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Dialog
         open={isOpen} 
         onOpenChange={(v) => {
            if(!v) {
                setIsOpen(v)
            }
        }}>
            <DialogTrigger asChild>
                <Button
                 variant="ghost" 
                 className="gap-1.5" 
                 aria-label="fullscreen">
                    <Expand className="h-4 w-4" />
                    </Button>
            </DialogTrigger>
        </Dialog>
    )
}

export default PdfFullscreen