import { prisma } from "@/prisma/client"
import { Flex, Grid } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import EditIssueButton from "./EditIssueButton"
import IssueDetails from "./IssueDetails"
import DeleteIssueButton from "./DeleteIssueButton"
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions"

interface Props {
    params: { id: string }
}

const IssueDetail = async ({ params }: Props) => {
    const { id } = await params
    const session = await getServerSession(authOptions)

    // if (typeof parseInt(id) !== 'number') return notFound()

    const issue = await prisma.issue.findUnique({
        where: { id: +id }
    })

    if (!issue) return notFound();

    return (
        <Grid columns={{ initial: "1", sm: "5" }} gap='4' >
            <IssueDetails issue={issue} />
            {session &&
                <Flex direction='column' gap='4'>
                    <EditIssueButton issueID={issue.id} />
                    <DeleteIssueButton issueID={issue.id} />
                </Flex>
            }
        </Grid>
    )
}

export default IssueDetail
