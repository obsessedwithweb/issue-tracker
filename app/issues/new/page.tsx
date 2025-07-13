"use client";

import {Button, TextArea, TextField} from "@radix-ui/themes";

export default function NewIssue() {
    return (
        <div className="max-w-xl space-y-5" >
            <TextField.Root placeholder="Add new issue..." />
            <TextArea placeholder='describe your issue' />
            <Button>Add</Button>
        </div >
    );
}
