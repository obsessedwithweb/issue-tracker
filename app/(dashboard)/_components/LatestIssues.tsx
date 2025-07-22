import {IssueStatusBadge} from "@/components/UI"
import {getAllIssuesWithAssignee} from "@/lib/fetchTools"
import {Avatar, Card, Flex, Heading, Table} from "@radix-ui/themes"
import Link from "next/link"


const LatestIssues = async () => {
    const issues = await getAllIssuesWithAssignee({
        orderBy: {
            createdAt: 'desc'
        },
        take: 5,
    })


    return (
        <Card >
            <Heading size='5' mb="5" >Latest Issues</Heading >
            <Table.Root >
                <Table.Body >
                    {
                        issues.map(issue => (
                            <Table.Row key={issue.id}
                                       className="dark:hover:bg-rose-400/20 hover:bg-rose-400/10 transition-colors" >
                                <Table.Cell >
                                    <Flex justify='between' align='center' >
                                        <Flex direction='column' align='start' gap='3' >
                                            <Link href={`/issues/${issue.id}`} >
                                                {issue.title}
                                            </Link >
                                            <IssueStatusBadge status={issue.status} />
                                        </Flex >
                                        {issue.assignedUser &&
                                            <Avatar
                                                src={issue.assignedUser.image!}
                                                fallback="?"
                                                size='2'
                                                radius="full" />
                                        }
                                    </Flex >
                                </Table.Cell >
                            </Table.Row >
                        ))
                    }
                </Table.Body >
            </Table.Root >
        </Card >
    )
}

export default LatestIssues
