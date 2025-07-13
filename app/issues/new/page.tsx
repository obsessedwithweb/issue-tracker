"use client";

import dynamic from 'next/dynamic';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod'


import { Button, Callout, TextField, Text } from "@radix-ui/themes";

import "easymde/dist/easymde.min.css";
import { useState } from 'react';
import { createIssueShcema } from "@/lib/validateSchemas";
import ErrorMessage from "@/components/UI/ErrorMessage";
import { Ripples } from 'ldrs/react'
import 'ldrs/react/Ripples.css'



const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
    ssr: false
});

type IssueForm = z.infer<typeof createIssueShcema>

export default function NewIssue() {
    const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueShcema)
    })
    const router = useRouter()
    const [error, setError] = useState('')

    const onSubmit = async (data: IssueForm) => {
        try {
            await axios.post('/api/issues', data)
            router.push('/issues')
        } catch (error) {
            setError("Check entered values")
            // console.log(error?.response.data.description._errors[0]);
            // console.log(error?.response.data.title._errors[0]);
        }
    }
    return (
        <div className='max-w-xl space-y-3 mb-5' >
            {
                error && <Callout.Root color='red' >
                    {/* <Callout.Icon>
                    <InfoCircledIcon />
                </Callout.Icon> */}
                    <Callout.Text >
                        {error}
                    </Callout.Text >
                </Callout.Root >
            }

            <form className="max-w-xl space-y-5" onSubmit={handleSubmit(onSubmit)} >
                <div className="space-y-2" >
                    <TextField.Root
                        placeholder="Add new issue..."
                        {...register('title')}
                    />
                    <ErrorMessage >{errors.title?.message}</ErrorMessage >
                </div >
                <div className="" >
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => <SimpleMDE placeholder="Describe your issue" {...field} />}
                    />
                    <ErrorMessage >{errors.description?.message}</ErrorMessage >
                </div >
                <Button disabled={isSubmitting} >
                    {isSubmitting ? <Ripples color='gray' size='40' /> : 'Add new issue'}
                </Button >
                {/* <Ripples color='gray' size='40' /> */}
            </form >
        </div >
    );
}
