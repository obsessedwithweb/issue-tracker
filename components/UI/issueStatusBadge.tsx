// 'use client'

import {Status} from '@prisma/client'
import {Badge} from "@radix-ui/themes";

type ValidColors = 'red' | 'green' | 'violet'
const StatusMap: Record<Status, {label: string, color: ValidColors}> = {
    OPEN: {label: 'Open', color: 'red'},
    IN_PROGRESS: {label: 'In Progress', color: 'violet'},
    CLOSED: {label: 'Closed', color: 'green'},
}

const issueStatusBadge = ({status}: {status: Status}) => {
    return <Badge color={StatusMap[status].color}>{StatusMap[status].label}</Badge>
}

export default issueStatusBadge;