'use client'

import { Flex, Text, Button } from "@radix-ui/themes"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { number } from "zod"

type PaginationProps = {
    ItemCount: number,
    PageSize: number,
    CurrentPage: number,
}

const Pagination = ({ ItemCount, PageSize, CurrentPage }: PaginationProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const pageCount = Math.ceil(ItemCount / PageSize)
    if (pageCount <= 1 || CurrentPage <=0) return null
    
    CurrentPage = isNaN(CurrentPage) ? 1 : CurrentPage


    const changePage = (pageNum: number) => {
        const params = new URLSearchParams(searchParams)

        params.set('page', pageNum.toString())
        router.push('?' + params.toString())
    }

    return (
        <Flex gap='2' align={'center'}>
            <Button
                variant="soft"
                color="gray"
                onClick={() => changePage(1)}
                disabled={CurrentPage === 1}>
                <ChevronsLeft />
            </Button>
            <Button
                variant="soft"
                color="gray"
                onClick={() => changePage(CurrentPage - 1)}
                disabled={CurrentPage === 1}>
                <ChevronLeft />
            </Button>
            <Text size="2">Page {CurrentPage} of {pageCount}</Text>
            <Button
                variant="soft"
                color="gray"
                onClick={() => changePage(CurrentPage + 1)}
                disabled={CurrentPage === pageCount}>
                <ChevronRight />
            </Button>
            <Button
                variant="soft"
                color="gray"
                onClick={() => changePage(pageCount)}
                disabled={CurrentPage === pageCount}>
                <ChevronsRight />
            </Button>

        </Flex>
    )
}

export default Pagination
