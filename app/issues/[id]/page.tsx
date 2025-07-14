import {IssueStatusBadge} from "@/components/UI"
import {prisma} from "@/prisma/client"
import {Button, Card, Flex, Heading, Text} from "@radix-ui/themes"

import {MoveLeft} from "lucide-react"
import Link from "next/link"
import {notFound} from "next/navigation"
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
        <Flex className="max-w-xl hover:content-['Back']" direction='column' gap='4'>
            <Link href={`/issues`} >
                <Button className=" hover:content-['Back']">
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

export default IssueDetail
