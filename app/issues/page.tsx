import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueStatusBadge from "@/components/UI/issueStatusBadge";
import ActionIssueButton from "@/components/UI/ActionIssueButton";
import delay from "delay";
import Link from "next/link";

const IssuesPage = async () => {
    const issues = await prisma.issue.findMany()
    await delay(2000);
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
                            <Link href={`/issues/${issue.id}`}>
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
