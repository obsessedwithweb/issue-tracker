import authOptions from "@/app/auth/authOptions"
// import { instance as axios } from "@/lib/axios-instance"
import { prisma } from "@/prisma/client"
// import { User } from "@prisma/client"
import { Flex, Grid } from "@radix-ui/themes"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import AsigneeSelect from "./AsigneeSelect"
import DeleteIssueButton from "./DeleteIssueButton"
import EditIssueButton from "./EditIssueButton"
import IssueDetails from "./IssueDetails"

interface Props {
    params: { id: string }
}

const IssueDetail = async ({ params }: Props) => {
    const { id } = await params
    const session = await getServerSession(authOptions)
    // const { data } = await axios.get<User[]>('/api/users')

    const issue = await prisma.issue.findUnique({
        where: { id: +id }
    })

    if (!issue) return notFound();

    return (
        <Grid columns={{ initial: "1", sm: "5" }} gap='4' >
            <IssueDetails issue={issue} />
            {session &&
                <Flex direction='column' gap='4'>
                    <AsigneeSelect />
                    <EditIssueButton issueID={issue.id} />
                    <DeleteIssueButton issueID={issue.id} />
                </Flex>
            }
        </Grid>
    )
}

export default IssueDetail
