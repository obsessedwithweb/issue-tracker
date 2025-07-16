"use client";

import { Avatar, Box, Button, Container, DropdownMenu, Flex, Skeleton } from "@radix-ui/themes";
import classNames from "classnames";
import { Bug } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Link = {
  label: string;
  href: string;
};


function NavBar() {

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
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
}

const NavLinks = () => {
  const currentPath: string = usePathname();

  const links: Link[] = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <ul className={`flex gap-4`}>
      {links.map((link: Link) => (
        <li key={link.href}>
          <Link
            className={classNames({
              "nav-link": true,
              "!text-slate-950": currentPath === link.href,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "unauthenticated") return <Link className="nav-link" href={"/api/auth/signin"}>Login</Link>
  else if (status === "loading") return <Skeleton>Loading</Skeleton>
  else
    return (
      <Box>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger
            className="transition-all hover:ring ring-gray-600/40 hover:shadow-lg shadow-slate-400/50" >
            <Avatar
              className="cursor-pointer"
              src={session!.user!.image!}
              size='2'
              radius="full"
              fallback={"?"}
            // referrerPolicy="no-referrer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>{session!.user!.email}</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item color="red">
              <Link href={"/api/auth/signout"}>Logout</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Box>
    )
}

export default NavBar;
