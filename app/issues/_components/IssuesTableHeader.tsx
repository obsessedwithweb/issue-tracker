'use client'

import {Issue} from "@prisma/client"
import {Flex, Table} from "@radix-ui/themes"
import {ArrowBigUp} from "lucide-react"
import Link from "next/link"
import {useSearchParams} from "next/navigation"

const IssuesTableHeader = () => {
    const searchParams = useSearchParams()
    const status = searchParams.get('status')
    const orderBy = searchParams.get('orderBy')
    const page = searchParams.get('page')

    console.log(page)
    const columns: { label: string, value: keyof Issue, className?: string }[] = [
        {label: "ID", value: "id"},
        {label: "Issue", value: "title"},
        {label: "Status", value: "status", className: "hidden md:table-cell"},
        {label: "Created At", value: "createdAt", className: "hidden md:table-cell"},
    ]
    return (
        <Table.Header className="transition-all" >
            <Table.Row >
                {columns.map((column) => (
                    <Table.ColumnHeaderCell
                        className={column.className}
                        key={column.value} >
                        <Flex gap='2' >
                            <Link href={{
                                query: {
                                    status,
                                    orderBy: column.value,
                                    page: page === null ? 1 : page
                                }
                            }} >
                                {column.label}
                            </Link >
                            {column.value === orderBy && <ArrowBigUp fill="white" className="" />}
                        </Flex >
                    </Table.ColumnHeaderCell >
                ))}
            </Table.Row >
        </Table.Header >
    )
}

export default IssuesTableHeader
