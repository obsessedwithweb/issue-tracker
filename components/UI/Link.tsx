import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

// interface Props {
//     href: string,
//      children: React.ReactNode
// }

const Link = ({ href, children }: PropsWithChildren<{ href: string }>) => {
    return (
        <RadixLink asChild>
            <NextLink href={href}>
                {children}
            </NextLink >
        </RadixLink>
    )
}

export default Link
