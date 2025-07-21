import {getIssueById} from '@/lib/fetchTools';
import {PropsWithChildren} from 'react';

type Props = Promise<{ id: string }>

export async function generateMetadata({params}: { params: Props }) {
    const {id} = await params

    const issue = await getIssueById(+id)

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