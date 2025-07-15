"use client";

import { usePathname } from "next/navigation";
import { Bug } from "lucide-react";
import classNames from "classnames";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Box, Container, Flex, Skeleton } from "@radix-ui/themes";

type Link = {
  label: string;
  href: string;
};


function NavBar() {
  const { status, data } = useSession();

  const currentPath: string = usePathname();

  const links: Link[] = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav
      className={`py-3 px-5 mb-5 border-b border-zinc-200`}
    >
      <Container>
        <Flex justify='between'>
          <Flex gap='8' align='center'>
            <Link
              href="/"
              className={`text-zinc-900 hover:text-zinc-600 transition-colors`}
            >
              <Bug />
            </Link>
            <ul className={`flex gap-4`}>
              {links.map((link: Link) => (
                <li key={link.href}>
                  <Link
                    className={classNames({
                      "text-slate-950": currentPath === link.href,
                      "text-zinc-600": currentPath !== link.href,
                      "hover:text-zinc-900 transition-colors": true,
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {
              status === "authenticated" && <Link href={"/api/auth/signout"}>Logout</Link>
            }
            {
              status === "unauthenticated" && <Link href={"/api/auth/signin"}>Login</Link>
            }{
              status === "loading" && <Skeleton>Loading</Skeleton>
            }
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}

export default NavBar;
