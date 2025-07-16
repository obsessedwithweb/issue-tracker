import {Flex, Skeleton} from "@radix-ui/themes";



const LoadingSimpleMDE = () => {
  return (
        <Flex direction='column' gap='4' className="max-w-xl">
            <Skeleton height='2rem' />
            <Skeleton height='25rem' />
        </Flex >
    );
}

export default LoadingSimpleMDE
