import {PropsWithChildren} from 'react';
import {prisma} from "@/prisma/client";

type Props = Promise<{ id: string }>

export async function generateMetadata({params}: { params: Props }) {
    const {id} = await params

    const issue = await prisma.issue.findUnique({where: {id: +id}})

    return {
        title: `${issue?.id} - ${issue?.title}`,
        description: `Issue: ${issue?.title} details`,
    }
}

const IssueLayout = ({children}: PropsWithChildren) => {
    return (
        < >
            {children}
        </ >
    );
};

export default IssueLayout;