"use client";

import {IssueStatusBadge} from "@/components/UI"
import {Issue, Status} from "@prisma/client"
import {Select} from "@radix-ui/themes"
import toast, {Toaster} from "react-hot-toast"


const ChangeStatus = ({issue}: { issue: Issue }) => {
    const statusArray: Status[] = Object.values(Status)

    const changeStatus = (newStatus: string) => {
        fetch("/api/issues/" + issue.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: newStatus,
            }),
        }).then(res => res.json())
            .then(() => toast.success('Status Changed'))
            .catch(() => {
                toast.error("Couldn\'t make the cahanges!")
            })
    };

    return (
        <>
            <Toaster />
            <Select.Root
                defaultValue={issue.status}
                onValueChange={changeStatus} >
                <Select.Trigger />
                <Select.Group >
                    <Select.Content >
                        <Select.Label >Status</Select.Label >
                        {
                            statusArray.map((status) => (
                                <Select.Item value={status} key={status} >
                                    {
                                        <IssueStatusBadge status={status} />
                                    }
                                </Select.Item >
                            ))
                        }
                    </Select.Content >
                </Select.Group >
            </Select.Root >
        </>
    )
}

export default ChangeStatus
