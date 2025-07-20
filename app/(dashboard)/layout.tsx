import {Metadata} from "next";
import {PropsWithChildren} from "react";


export const metadata: Metadata = {
    title: 'Issue Tracker - Dashboard',
    description: 'Dashboard of the issue tracker platform',
}

const DashboardLayout = ({children}: PropsWithChildren) => {
    return (
        < >{children}</ >
    );
};

export default DashboardLayout;