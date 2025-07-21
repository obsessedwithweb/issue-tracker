import {getIssueById} from "@/lib/fetchTools";
import {notFound} from "next/navigation";
import IssueForm from "../../_components/IssueForm";


type Params = Promise<{ id: string }>

export async function generateMetadata({params}: { params: Params }) {
    const {id} = await params

    const issue = await getIssueById(+id)

    return {
        title: `Edit Issue - ${issue?.title}`,
        description: `Edit issue: ${issue?.title} details`,
    }
}


const EditIssuePage = async ({params}: { params: Params }) => {
    const {id} = await params

    const issue = await getIssueById(+id)

    if (!issue) return notFound();

    return (
        <IssueForm issue={issue} />
    )
}

export default EditIssuePage
