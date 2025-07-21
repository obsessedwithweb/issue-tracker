import { BackButton } from "@/components/UI";
import { Flex, Skeleton } from "@radix-ui/themes";


const IssueFormSkeleton = () => {
    return (
        <Flex direction='column' gap='4' className="max-w-xl" >
            <BackButton />
            <Skeleton height='2rem' />
            <Skeleton height='25rem' />
        </Flex >
    );
};


export default IssueFormSkeleton;