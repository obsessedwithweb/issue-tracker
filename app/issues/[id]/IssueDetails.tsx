import { IssueStatusBadge } from "@/components/UI"
import { Issue } from "@prisma/client"
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes"
import { MoveLeft } from "lucide-react"
import Link from "next/link"
import Markdown from 'react-markdown'

const IssueDetails = ({ issue }: { issue: Issue }) => {
    return (
        <Flex className="" direction='column' gap='4'>
            <Link href={`/issues`} >
                <Button className="">
                    <MoveLeft />
                </Button>
            </Link>
            <Heading>{issue.title}</Heading>
            <Flex gap='2' my='2'>
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className="prose">
                <Markdown>{issue.description}</Markdown>
            </Card>
        </Flex>
    )
}

export default IssueDetails;
