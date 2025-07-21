import {IssueStatusBadge} from "@/components/UI"
import {Issue} from "@prisma/client"
import {Table} from "@radix-ui/themes"
import Link from "next/link"
import {IssuesTableHeader} from "."


const IssuesTable = ({ issues }: { issues: Issue[] }) => {
    return (
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
                        <Table.Cell className="hidden md:table-cell">{new Date(issue.createdAt).toDateString()}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    )
}

export default IssuesTable
