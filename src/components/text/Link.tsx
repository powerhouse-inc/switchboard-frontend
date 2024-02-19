import Link from "next/link";
import React from "react";

interface SwitchboardLinkProps {
    href: string;
    children: React.ReactNode;
}

export default function SwitchboardLink({ href, children }: SwitchboardLinkProps) {
    return (
        <Link className="text-black hover:text-orange-500" href={href}>
            {children}
        </Link>
    );
}
