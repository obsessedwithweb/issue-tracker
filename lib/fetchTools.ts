import {unstable_cache as nextCache} from "next/cache";
import {prisma} from "@/prisma/client";
import {Status} from "@prisma/client";


export const getAllIssues = nextCache(
    async (options?: {}) => {
        return await prisma.issue.findMany(options);
    }, ['AllIssues']
    ,{
        tags: ['allIssues']
    }
)

export const getAllIssuesWithAssignee = nextCache(
    async (options?: {}) => {
        return await prisma.issue.findMany({
            ...options,
            include: {
                assignedUser: true
            }
        });
    }, ['AllIssuesWithAssignee']
    ,{
        tags: ['allIssuesWithAssignee']
    }
)

export const getStatusCount = nextCache(
    async (status: Status) => {
        return await prisma.issue.count({ where: { status } })
    }, ['statusCount'],
    {
        tags: ['statusCount']
    }
)


export const getIssueById = nextCache(
    async (id: number) => {
        return await prisma.issue.findUnique({where: {id: id}})
    }, ['issueId'], {
        tags: ['issueId']
    }
)