import { prisma } from "@/prisma/client"
import { Grid } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import EditIssueButton from "./EditIssueButton"
import IssueDetails from "./IssueDetails"

interface Props {
    params: { id: string }
}

const IssueDetail = async ({ params }: Props) => {
    const { id } = await params


    // if (typeof parseInt(id) !== 'number') return notFound()

    const issue = await prisma.issue.findUnique({
        where: { id: +id }
    })

    if (!issue) return notFound();

    return (
        <Grid columns={{ initial: "1", md: "2" }} gap='4' >
            <IssueDetails issue={issue} />
            <EditIssueButton issueID={issue.id}/>
        </Grid>
    )
}

export default IssueDetail
