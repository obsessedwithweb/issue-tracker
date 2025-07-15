"use client";

import { ErrorMessage } from "@/components/UI";
import { issueShcema } from "@/lib/validateSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import { Ripples } from 'ldrs/react';
import { Info, MoveLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

import "easymde/dist/easymde.min.css";
import 'ldrs/react/Ripples.css';

type IssueForm = z.infer<typeof issueShcema>

export default function NewIssue({ issue }: { issue?: Issue }) {
    const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<IssueForm>({
        resolver: zodResolver(issueShcema)
    })
    const router = useRouter()
    const [error, setError] = useState('')

    const onSubmit = async (data: IssueForm) => {
        try {
            issue ?
                await axios.patch('/api/issues/' + issue.id, data)
                : await axios.post('/api/issues', data)
            router.push('/issues')
        } catch (_) {
            setError("Check entered values ")
            // console.log(error?.response.data.description._errors[0]);
            // console.log(error?.response.data.title._errors[0]);
        }
    }

    return (
        <div className='max-w-xl flex flex-col gap-3 mb-5' >
            <Link href={`/issues`} className="">
                <Button className="">
                    <MoveLeft />
                </Button>
            </Link>
            {
                error && <Callout.Root color='red' >
                    <Callout.Icon>
                        <Info />
                    </Callout.Icon>
                    <Callout.Text >
                        {error}
                    </Callout.Text >
                </Callout.Root >
            }

            <form className="max-w-xl space-y-5" onSubmit={handleSubmit(onSubmit)} >
                <div className="space-y-2" >
                    <TextField.Root
                        defaultValue={issue?.title}
                        placeholder="Add new issue..."
                        {...register('title')}
                    />
                    <ErrorMessage >{errors.title?.message}</ErrorMessage >
                </div >
                <div className="" >
                    <Controller
                        name="description"
                        defaultValue={issue?.description}
                        control={control}
                        render={({ field }) => <SimpleMDE placeholder="Describe your issue" {...field} />}
                    />
                    <ErrorMessage >{errors.description?.message}</ErrorMessage >
                </div >
                <Button disabled={isSubmitting} >
                    Add new issue
                    {isSubmitting && <Ripples color='gray' size='40' />}
                </Button >
                {/* <Ripples color='gray' size='40' /> */}
            </form >
        </div >
    );
}
