"use client";

import { Button, TextField } from "@radix-ui/themes";
import dynamic from 'next/dynamic';
import { useForm, Controller } from "react-hook-form";

import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
    ssr: false
});

interface IssueForm {
    title: string,
    description: string
}

export default function NewIssue() {
    const { register, control, handleSubmit } = useForm<IssueForm>()
    const router = useRouter()
    return (
        <form className="max-w-xl space-y-5" onSubmit={handleSubmit(async (data) => {
            console.log(`data: ${data}`)
            await axios.post('/api/issues', data)
            router.push('/issues')
        })} >
            <TextField.Root
                placeholder="Add new issue..."
                {...register('title')}
            />
            <Controller
                name="description"
                control={control}
                render={({ field }) => <SimpleMDE placeholder="Describe your issue" {...field} />}
            />
            <Button>Add</Button>
        </form >
    );
}
