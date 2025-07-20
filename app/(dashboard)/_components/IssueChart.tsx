'use client'

import {Card} from "@radix-ui/themes";
import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from "recharts";


type Props = {
    open: number,
    inProgress: number,
    closed: number,
}


const IssueChart = ({open, inProgress, closed}: Props) => {

    const data: {
        label: string,
        value: number,
    }[] = [
        {label: "Open", value: open},
        {label: "In Progress", value: inProgress},
        {label: "Closed", value: closed},
    ]

    return (
        <Card >
            <ResponsiveContainer height={300}>
                <BarChart data={data} >
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Bar dataKey='value' barSize='60' style={{fill: 'var(--iris-9)'}}/>
                </BarChart >
            </ResponsiveContainer >
        </Card >
    );
};

export default IssueChart;