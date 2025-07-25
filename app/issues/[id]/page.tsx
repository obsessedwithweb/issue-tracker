import authOptions from "@/app/auth/authOptions"
// import { instance as axios } from "@/lib/axios-instance"
// import { User } from "@prisma/client"
import {Flex, Grid} from "@radix-ui/themes"
import {getServerSession} from "next-auth"
import {notFound} from "next/navigation"
import AssigneeSelect from "./AssigneeSelect"
import DeleteIssueButton from "./DeleteIssueButton"
import EditIssueButton from "./EditIssueButton"
import IssueDetails from "./IssueDetails"
import {getIssueById} from "@/lib/fetchTools"
import ChangeStatus from "./edit/ChangeStatus"

type Params = Promise<{ id: string }>

const IssueDetail = async ({params}: { params: Params }) => {
    const {id} = await params
    const session = await getServerSession(authOptions)
    // const { data } = await axios.get<User[]>('/api/users')

    const issue = await getIssueById(+id)


    if (!issue) return notFound();

    return (
        <Grid columns={{initial: "1", sm: "5"}} gap='4' >
            <IssueDetails issue={issue} />
            {session &&
                <Flex direction='column' gap='4' >
                    <AssigneeSelect issue={issue} />
                    <ChangeStatus issue={issue} />
                    <EditIssueButton issueID={issue.id} />
                    <DeleteIssueButton issueID={issue.id} />
                </Flex >
            }
        </Grid >
    )
}

export default IssueDetail
