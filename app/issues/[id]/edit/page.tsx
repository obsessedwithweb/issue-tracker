import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";


const EditIssuePage = async ({ params }: {params: { id: string }}) => {
    const { id } = await params

    // if (typeof parseInt(id) !== 'number') return notFound()

    const issue = await prisma.issue.findUnique({
        where: { id: +id }
    })

    if (!issue) return notFound();

    return (
    <IssueForm  issue={issue}/>
    )
}

export default EditIssuePage
