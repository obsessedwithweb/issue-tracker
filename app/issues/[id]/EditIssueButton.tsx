import {Button} from '@radix-ui/themes'
import {SquarePen} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const EditIssueButton = ({issueID}: { issueID: number }) => {
    return (
        <Button >
            <SquarePen size={16} strokeWidth={2} />
            <Link href={`/issues/${issueID}/edit`} >Edit issue</Link >
        </Button >
    )
}

export default EditIssueButton;
