'use client'
import {Status} from "@prisma/client"
import {Select} from "@radix-ui/themes"
import {useRouter, useSearchParams} from "next/navigation"


const statuses: { label: string, value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "In progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
]

const IssueStatusFilter = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const status = searchParams.get('status')
    const orderBy = searchParams.get('orderBy')
    const page = searchParams.get('page')


    return (
        <Select.Root
            defaultValue={status || 'ALL'}
            onValueChange={(status) => {
                const params = new URLSearchParams()
                
                status && status !== 'ALL' && params.append('status', status)
                orderBy && params.append('orderBy', orderBy)
                page && params.append('page', '1')

                const query = params.size ? `?${params.toString()}` : ""
                router.push('/issues' + query)
            }}
        >
            <Select.Trigger placeholder="Filter by status..." />
            <Select.Content>
                {statuses.map(item =>
                    <Select.Item key={item.label} value={item.value || "ALL"}>
                        {item.label}
                    </Select.Item>
                )}
            </Select.Content>
        </Select.Root>
    )
}

export default IssueStatusFilter
