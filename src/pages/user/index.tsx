import TokenForm from "@/components/tokens/token-form";
import TokensTable from "@/components/tokens/tokens-table";
import useAuth, { authStore } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

const User = () => {
    const address = authStore((state) => state.address);
    const gqlToken = authStore((state) => state.gqlToken);

    const { signIn, checkAuthValidity } = useAuth();

    useEffect(() => {
        if (gqlToken) {
            checkAuthValidity();
        }
    }, [gqlToken]);

    if (!address) {
        return (
            <div>
                <button onClick={signIn}>Login</button>
            </div>
        );
    }
    return (
        <div className="">
            <h1 className="text-3xl font-bold mb-4">Manage Tokens</h1>
            <TokenForm />
            <h2 className="text-xl font-semibold mt-8 mb-4">Existing Tokens</h2>
            <TokensTable />
        </div>
    );
};

export default User;
