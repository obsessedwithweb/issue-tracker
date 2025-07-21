import {Skeleton, Table} from "@radix-ui/themes";
import {ActionIssueButton} from "@/app/issues/_components";


const LoadingIssue = () => {
    const issues = [1, 2, 3, 4, 5];
    return (
        <div >
            <ActionIssueButton />
            <Table.Root variant="surface" >
                <Table.Header >
                    <Table.Row >
                        <Table.ColumnHeaderCell >Id</Table.ColumnHeaderCell >
                        <Table.ColumnHeaderCell >Issue</Table.ColumnHeaderCell >
                        <Table.ColumnHeaderCell className="hidden md:table-cell" >Status</Table.ColumnHeaderCell >
                        <Table.ColumnHeaderCell className="hidden md:table-cell" >Created at</Table.ColumnHeaderCell >
                    </Table.Row >
                </Table.Header >
                <Table.Body >
                    {issues.map(issue => (
                        <Table.Row key={issue} >
                            <Table.Cell ><Skeleton /></Table.Cell >
                            <Table.Cell className="space-y-2" >
                                <Skeleton />
                            </Table.Cell >
                            <Table.Cell className="hidden md:table-cell" >
                                <Skeleton />
                            </Table.Cell >
                            <Table.Cell className="hidden md:table-cell" >
                                <Skeleton />
                            </Table.Cell >
                        </Table.Row >
                    ))}
                </Table.Body >
            </Table.Root >
        </div >
    );
};

export default LoadingIssue;