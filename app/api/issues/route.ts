import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";
import {createIssueShcema} from "@/lib/validateSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json()
  console.log(`body: ${body}`)
  const validation = createIssueShcema.safeParse(body)
  
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })
  
  const newIssue = await prisma.issue.create({
    data: {title:body.title, description: body.description}
  })
  
  return NextResponse.json(newIssue, { status: 201 })
}