import { Status } from '@prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'

type Props = {
    open: number,
    inProgress: number,
    closed: number,
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {

    const issueStatus: {
        label: string,
        count: number,
        type: Status,
        color: string
    }[] = [
            { label: "Open Issues", count: open, type: 'OPEN', color: 'red' },
            { label: "In Progress Issues", count: inProgress, type: 'IN_PROGRESS', color: 'fuchsia' },
            { label: "Closed Issues", count: closed, type: 'CLOSED', color: 'teal' },
        ]

    return (
        <Flex gap='2'>
            {issueStatus.map(issueType => (
                <Card
                    className={`hover:bg-${issueType.color}-200/20 transition-colors`}
                    key={issueType.type}>
                    <Flex
                        direction='column'
                        gap='3'>
                        <Text className={`text-sm font-medium text-${issueType.color}-600`}>
                            <Link href={`/issues?status=${issueType.type}`}>{issueType.label}</Link>
                        </Text>
                        <Text size='6' className={`font-semibold hover:text-${issueType.color}-600 transition-colors`}>{issueType.count}</Text>
                    </Flex>
                </Card>
            ))}
        </Flex>
    )
}

export default IssueSummary
