import {Box, Button, Skeleton} from "@radix-ui/themes";
import {MoveLeft} from "lucide-react";
import Link from "next/link";


const LoadingIssue = () => {
    return (
        <Box className="max-w-xl flex flex-col gap-3">
            <Link href={`/issues`} >
                <Button className="">
                    <MoveLeft />
                </Button>
            </Link>
            <Skeleton height='2rem' />
            <Skeleton height='15rem' />
        </Box >
    );
};

export default LoadingIssue;