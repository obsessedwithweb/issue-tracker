import Pagination from "@/components/UI/Pagination";
import { prisma } from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { ActionIssueButton } from "./_components";
import IssuesTable from "./_components/IssuesTable";

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

    const pageSize = 2

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
        <IssuesTable issues={issues} />
        <Pagination
            itemCount={issuesCount}
            pageSize={pageSize}
            currentPage={+page}
        />
    </Flex >;
};

export default IssuesPage;
