import {Pagination} from "@/components/UI";
import {Issue, Status} from "@prisma/client";
import {Flex} from "@radix-ui/themes";
import {ActionIssueButton, IssuesTable} from "./_components";
import {getAllIssues, getStatusCount} from "@/lib/fetchTools";

export const dynamic = 'force-dynamic'

type SearchParams = Promise<{ status: Status, orderBy: keyof Issue, page: string }>

const IssuesPage = async ({searchParams}: { searchParams: SearchParams }) => {

    const {status} = await searchParams
    const {orderBy} = await searchParams
    let {page} = await searchParams
    page = page ?? '1'

    const statusList = Object.values(Status)
    const isStatusExists = statusList.includes(status!)
    const where: { status: Status | undefined } = {status: isStatusExists ? status : undefined,}

    const orderParams: string[] = ["ID", "Issue", "Status", "Created At"]

    const pageSize: number = 8

    const issues: Issue[] = await getAllIssues({
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

    const issuesCount: number = await getStatusCount(where.status!)

    return (
        <Flex direction='column' gap='6' mb='8' >
            <ActionIssueButton />
            <IssuesTable issues={issues} />
            <Pagination
                itemCount={issuesCount}
                pageSize={pageSize}
                currentPage={+page}
            />
        </Flex >
    );
};

export default IssuesPage;
