import {Button, Card, Flex, Skeleton} from '@radix-ui/themes'
import {MoveLeft} from 'lucide-react'
import Link from "next/link"

const IssueDetailLoading = () => {
    return (
        <Flex className="max-w-xl hover:content-['Back']" direction='column' gap='4' >
            <Link href={`/issues`} >
                <Button className="" >
                    <MoveLeft />
                </Button >
            </Link >
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
