import {Button, Flex, Skeleton} from "@radix-ui/themes";
import {MoveLeft} from "lucide-react";
import Link from "next/link";


const IssueFormSkeleton = () => {
    return (
        <Flex direction='column' gap='4' className="max-w-xl">
            <Link href={`/issues`} >
                <Button className="">
                    <MoveLeft />
                </Button>
            </Link>
            <Skeleton height='2rem' />
            <Skeleton height='25rem' />
        </Flex >
    );
};


export default IssueFormSkeleton;