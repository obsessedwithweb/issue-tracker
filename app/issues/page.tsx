import { IssueStatusBadge } from "@/components/UI";
import {ActionIssueButton} from "./_components"
import Link from "@/components/UI/Link";
import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { Status } from "@prisma/client";

type SearchParams = Promise<{status: Status}>

const IssuesPage = async ({searchParams}: {searchParams: SearchParams}) => {
    let {status} = await searchParams

    const statusList = Object.values(Status)
    const isStatusExists = statusList.includes(status)
    
    
    const issues = await prisma.issue.findMany({
        where: {
            status: isStatusExists ? status : undefined,
        }
    })
    return <div >
        <ActionIssueButton />
        <Table.Root variant="surface">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="hidden md:table-cell">Created at</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {issues.map(issue => (
                    <Table.Row key={issue.id}>
                        <Table.Cell>{issue.id}</Table.Cell>
                        <Table.Cell className="space-y-2">
                            <Link href={`/issues/${issue.id}`} >
                                {issue.title}
                            </Link>
                            <div className="block md:hidden">
                                <IssueStatusBadge status={issue.status} />
                            </div>
                        </Table.Cell>
                        <Table.Cell className="hidden md:table-cell">
                            <IssueStatusBadge status={issue.status} />
                        </Table.Cell>
                        <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    </div >;
};

export default IssuesPage;
