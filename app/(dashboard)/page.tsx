// 'use client'

import { getStatusCount } from "@/lib/fetchTools";
import { Status } from "@prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { IssueChart, IssueSummary, LatestIssues } from "./_components";

export const dynamic = 'auto'
// type SearchParams = Promise<{ page: string }>
// { searchParams }: { searchParams: SearchParams }
export default async function Home() {
  // const page =  use(searchParams)

  const openIssues = await getStatusCount(Status.OPEN)
  const inProgressIssues = await getStatusCount(Status.IN_PROGRESS)
  const closedIssues = await getStatusCount(Status.CLOSED)

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='8'>
      <Flex direction='column' gap={"5"}>
        <IssueSummary
          open={openIssues}
          closed={closedIssues}
          inProgress={inProgressIssues} />
        <IssueChart
          open={openIssues}
          inProgress={inProgressIssues}
          closed={closedIssues} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
