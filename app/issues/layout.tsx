import {PropsWithChildren} from 'react';
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Issues List",
    description: "All issue's details spotted yet are available here.",
}

const IssuesLayout = ({children}: PropsWithChildren) => {
    return (
        < >
            {children}
        </ >
    );
};

export default IssuesLayout;