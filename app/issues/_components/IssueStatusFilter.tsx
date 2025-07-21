'use client'
import { Status } from "@prisma/client"
import { Select } from "@radix-ui/themes"


const statuses: { label: string, value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "In progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
]

const IssueStatusFilter = () => {
    return (
        <Select.Root>
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
