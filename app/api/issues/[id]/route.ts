"use server";

import authOptions from "@/app/auth/authOptions";
import {patchIssueSchema} from "@/lib/validateSchemas";
import {prisma} from "@/prisma/client";
import {getServerSession} from "next-auth";
import {revalidateTag} from "next/cache";
import {NextRequest, NextResponse} from "next/server";

type IssueProps = Promise<{ id: string }>

export async function PATCH(
    request: NextRequest,
    {params}: { params: IssueProps },
) {
    // const session = await getServerSession(authOptions)
    // if (!session) return NextResponse.json({}, { status: 401 })

    const {id} = await params;

    if (!id)
        return NextResponse.json(
            {error: "Invalid issueId requested!"},
            {status: 404},
        );

    const issue = await prisma.issue.findUnique({
        where: {id: +id},
    });

    if (!issue)
        return NextResponse.json(
            {error: "Invalid issueId requested!"},
            {status: 404},
        );

    const body = await request.json();
    const validation = patchIssueSchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.issues, {status: 400});

    const {title, description, assignedUserId} = body;

    if (assignedUserId) {
        const user = await prisma.user.findUnique({
            where: {id: assignedUserId},
        });
        if (!user)
            return NextResponse.json({error: "User not found!"}, {status: 400});
    }

    const updatedIssue = await prisma.issue.update({
        where: {id: issue.id},
        data: {
            title,
            description,
            assignedUserId
        },
    });
    revalidateTag('allIssues')
    revalidateTag('issueId')

    revalidateTag('allIssuesWithAssignee')
    // revalidatePath("/issues");
    // revalidatePath('/(dashboard)/', 'page')
    // revalidatePath('/', 'layout')

    return NextResponse.json(updatedIssue);
}

export const DELETE = async (
    request: NextRequest,
    {params}: { params: IssueProps },
) => {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, {status: 401});

    const {id} = await params;

    const issue = await prisma.issue.findUnique({
        where: {id: +id},
    });

    if (!issue)
        return NextResponse.json(
            {error: "Invalid Id requested!"},
            {status: 404},
        );

    await prisma.issue.delete({
        where: {
            id: issue.id,
        },
    });

    revalidateTag('allIssues')
    revalidateTag('issueId')

    revalidateTag('statusCount')
    revalidateTag('allIssuesWithAssignee')
    // revalidatePath('/(dashboard)/', 'page')
    return NextResponse.json({});
};
