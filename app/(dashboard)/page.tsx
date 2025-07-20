// 'use client'

import { prisma } from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { IssueChart, IssueSummary, LatestIssues } from "./_components";

// type SearchParams = Promise<{ page: string }>
// { searchParams }: { searchParams: SearchParams }
export default async function Home() {
  // const page =  use(searchParams)

  const openIssues = await prisma.issue.count({ where: { status: "OPEN" } })
  const inProgressIssues = await prisma.issue.count({ where: { status: "IN_PROGRESS" } })
  const closedIssues = await prisma.issue.count({ where: { status: "CLOSED" } })

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
