import { IssueStatusBadge } from "@/components/UI";
import Link from "@/components/UI/Link";
import { prisma } from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import { ActionIssueButton, IssuesTableHeader } from "./_components";
import Pagination from "@/components/UI/Pagination";

type SearchParams = Promise<{ status: Status, orderBy: keyof Issue, page: string }>

const IssuesPage = async ({ searchParams }: { searchParams: SearchParams }) => {
    const { status } = await searchParams
    const { orderBy } = await searchParams
    let { page } = await searchParams
    page = page ?? 1
    const statusList = Object.values(Status)
    const isStatusExists = statusList.includes(status!)
    const where = { status: isStatusExists ? status : undefined, }

    const orderParams: string[] = ["ID", "Issue", "Status", "Created At"]

    const pageSize = 10

    const issues = await prisma.issue.findMany({
        where,
        ...(orderBy && orderParams.includes(orderBy)
            ? {
                orderBy: {
                    [orderBy]: 'asc',
                },
            }
            : {}),
        take: pageSize,
        skip: (+page - 1) * pageSize,
    })

    const issuesCount = await prisma.issue.count({ where, })

    return <Flex direction='column' gap='8' >
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
        <Pagination itemCount={issuesCount} pageSize={pageSize} currentPage={+page} />
    </Flex >;
};

export default IssuesPage;
