"use client";

import { usePathname } from "next/navigation";
import { Bug } from "lucide-react";
import classNames from "classnames";
import Link from "next/link";

type Link = {
  label: string;
  href: string;
};

function NavBar() {
  const currentPath: string = usePathname();

  const links: Link[] = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav
      className={`flex items-center h-14 px-5 mb-5 border-b border-zinc-200 justify-between`}
    >
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
    </nav>
  );
}

export default NavBar;
