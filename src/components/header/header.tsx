import Link from "next/link";
import SwitchboardLink from "../text/Link";
import { authStore } from "@/hooks/useAuth";

export default function Header() {
    const address = authStore((state) => state.address);

    return (
        <header className="bg-orange-100 fixed w-full top-0 text-black py-2">
            <nav className="flex justify-between items-center flex-row">
                <div className="flex items-center space-x-4">
                    <SwitchboardLink href="/">
                        <div className="flex flex-row items-center">
                            <img src="/assets/logo.svg" className="w-10" />
                            Switchboard API
                        </div>
                    </SwitchboardLink>
                </div>
                <div className="flex grow justify-center gap-4">
                    <SwitchboardLink href="/user">API Token Generation</SwitchboardLink>
                    <SwitchboardLink href="/graphql">Admin</SwitchboardLink>
                    <SwitchboardLink href="/graphql/monetalis">Monetalis</SwitchboardLink>
                </div>
                <div className="flex items-center space-x-4">{!address ? <SwitchboardLink href="/user-information">User Information</SwitchboardLink> : <div>{address}</div>}</div>
            </nav>
        </header>
    );
}
