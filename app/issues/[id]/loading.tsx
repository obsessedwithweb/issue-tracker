import { BackButton } from '@/components/UI'
import { Card, Flex, Skeleton } from '@radix-ui/themes'

const IssueDetailLoading = () => {
    return (
        <Flex className="max-w-xl hover:content-['Back']" direction='column' gap='4' >
            <BackButton />
            <Skeleton height='2rem' />
            <Flex gap='2' my='2' >
                <Skeleton width={'4rem'} /> {/* Badge */}
                <Skeleton width={'4rem'} /> {/* Date */}
            </Flex >
            <Card className="prose" >
                <Skeleton height={`10rem`} />
            </Card >
        </Flex >
    )
}

export default IssueDetailLoading
