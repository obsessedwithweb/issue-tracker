'use client'

import {Button, Flex, Text} from "@radix-ui/themes"
import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight} from "lucide-react"
import {useRouter, useSearchParams} from "next/navigation"

type PaginationProps = {
    itemCount: number,
    pageSize: number,
    currentPage: number,
}

const Pagination = ({ itemCount, pageSize, currentPage }: PaginationProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const pageCount = Math.ceil(itemCount / pageSize)
    if (pageCount <= 1 || currentPage <=0) return null
    
    currentPage = isNaN(currentPage) ? 1 : currentPage


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
                disabled={currentPage === 1}>
                <ChevronsLeft />
            </Button>
            <Button
                variant="soft"
                color="gray"
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}>
                <ChevronLeft />
            </Button>
            <Text size="2">Page {currentPage} of {pageCount}</Text>
            <Button
                variant="soft"
                color="gray"
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === pageCount}>
                <ChevronRight />
            </Button>
            <Button
                variant="soft"
                color="gray"
                onClick={() => changePage(pageCount)}
                disabled={currentPage === pageCount}>
                <ChevronsRight />
            </Button>

        </Flex>
    )
}

export default Pagination
