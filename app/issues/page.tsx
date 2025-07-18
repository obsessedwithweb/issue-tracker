import { IssueStatusBadge } from "@/components/UI";
import Link from "@/components/UI/Link";
import { prisma } from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import { ActionIssueButton, IssuesTableHeader } from "./_components";

type SearchParams = Promise<{ status: Status, orderBy: keyof Issue }>

const IssuesPage = async ({ searchParams }: { searchParams: SearchParams }) => {
    const { status } = await searchParams
    const { orderBy } = await searchParams

    const statusList = Object.values(Status)
    const isStatusExists = statusList.includes(status!)

    let orderParams: string[] = ["ID", "Issue", "Status", "Created At"]
    
    const issues = await prisma.issue.findMany({
        where: {
            status: isStatusExists ? status : undefined,
        },
        ...(orderBy && orderParams.includes(orderBy)
            ? {
                orderBy: {
                    [orderBy]: 'asc',
                },
            }
            : {}),
    })



    return <div >
        <ActionIssueButton />
        <Table.Root variant="surface">
            <IssuesTableHeader />
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
