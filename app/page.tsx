// 'use client'

import { prisma } from "@/prisma/client";
import IssueSummary from "./IssueSummary";

type SearchParams = Promise<{ page: string }>

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  // const page =  use(searchParams)

  const openIssues = await prisma.issue.count({ where: { status: "OPEN" } })
  const inProgressIssues = await prisma.issue.count({ where: { status: "IN_PROGRESS" } })
  const closedIssues = await prisma.issue.count({ where: { status: "CLOSED" } })

  return (
    // <LatestIssues />
    <IssueSummary
      open={openIssues}
      closed={closedIssues}
      inProgress={inProgressIssues} />
  );
}
