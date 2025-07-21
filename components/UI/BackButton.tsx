'use client'

import { Button } from "@radix-ui/themes"
import { MoveLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const BackButton = () => {
    const router = useRouter()
    return (
        <div>
            <Button className="" onClick={() => router.back()}>
                <MoveLeft />
            </Button >
        </div>
    )
}

export default BackButton
