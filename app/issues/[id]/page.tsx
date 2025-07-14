import IssueStatusBadge from "@/components/UI/issueStatusBadge"
import { prisma } from "@/prisma/client"
import { Card, Flex, Heading, Text } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import Markdown from 'react-markdown'

interface Props {
    params: { id: string }
}

const IssueDetail = async ({ params }: Props) => {
    const { id } = await params


    // if (typeof parseInt(id) !== 'number') return notFound()

    const issue = await prisma.issue.findUnique({
        where: { id: +id }
    })

    if (!issue) return notFound();

    return (
        <div className="max-w-80">
            <Heading>{issue.title}</Heading>
            <Flex gap='2' my='2'>
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className="prose">
                <Markdown>{issue.description}</Markdown>
            </Card>
        </div>
    )
}

export default IssueDetail
