'use server'

import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";
import {issueSchema} from "@/lib/validateSchemas";
import {revalidateTag} from "next/cache";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions"

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions)

    if (!session) return NextResponse.json({}, {status: 401})

    const body = await request.json()
    const validation = issueSchema.safeParse(body)

    if (!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400})

    const newIssue = await prisma.issue.create({
        data: {title: body.title, description: body.description}
    })
    // revalidateTag('issueId')
    // revalidatePath('/issues')
    revalidateTag('statusCount')
    revalidateTag('allIssues')
    revalidateTag('allIssuesWithAssignee')
    // revalidatePath('/', 'layout')
    // revalidatePath('/(dashboard)/', 'page')


    return NextResponse.json(newIssue, {status: 201})
}