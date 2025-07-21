import {Button, Flex} from "@radix-ui/themes";
import Link from "next/link";
import {IssueStatusFilter} from ".";


const ActionIssueButton = () => {
    return (
        <Flex justify='between' >
            <IssueStatusFilter />
            <Button >
                <Link href='/issues/new' >New Issue</Link >
            </Button >
        </Flex >
    );
};

export default ActionIssueButton;