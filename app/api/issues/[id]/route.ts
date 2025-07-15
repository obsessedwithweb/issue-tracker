'use server'
import { issueShcema } from "@/lib/validateSchemas";
import { prisma } from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params

    const issue = await prisma.issue.findUnique({
        where: { id: +id }
    })

    if (!issue)
        return NextResponse.json({ error: 'Invalid Id requested!' }, { status: 404 })

    const body = await request.json()
    const validation = issueShcema.safeParse(body)

    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 })

    console.log(`id: ${id}`)
    console.log(`issue: ${issue}`)

    const updatedIssue = await prisma.issue.update(
        {
            where: { id: issue.id },
            data: {
                title: body.title,
                description: body.description
            }
        }
    )
    revalidatePath('/issues')

    return NextResponse.json(updatedIssue)

}

export const DELETE = async (
    request: NextRequest,
    { params }: { params: { id: string } }
) => {

    const { id } = await params

    const issue = await prisma.issue.findUnique({
        where: { id: +id }
    })

    if (!issue)
        return NextResponse.json({ error: 'Invalid Id requested!' }, { status: 404 })


    await prisma.issue.delete({
        where: {
            id: issue.id
        }
    })

    revalidatePath("/issues")
    return NextResponse.json({})
}