"use client"

import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { useState } from "react"
import { Button } from "./ui/button"

const UploadButton = () => {
const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <Dialog
         open={isOpen}
          onOpenChange={(v) => {
            if(!v) {
                setIsOpen(v)
            }
        }}>
            <DialogTrigger onClick={() => setIsOpen(true)} asChild>
                <Button>Upload PDF</Button>
            </DialogTrigger>

            <DialogContent>
                EXAMPLE OF POPUP
            </DialogContent>
        </Dialog>
    )
}

export default UploadButton