import TokenForm from "@/components/tokens/token-form";
import TokensTable, { Token } from "@/components/tokens/tokens-table";
import { useState } from "react";

const User = () => {
    // Dummy token data for demonstration
    const [tokens, setTokens] = useState<Token[]>([
        {
            name: "Token 1",
            type: "Type A",
            token: "abc123",
            expiresAt: "2024-02-28",
            allowedOrigins: ["*"],
            status: "Active",
        },
        {
            name: "Token 2",
            type: "Type B",
            token: "xyz789",
            expiresAt: "2024-03-15",
            allowedOrigins: ["example.com"],
            status: "Inactive",
        },
    ]);

    return (
        <div className="">
            <h1 className="text-3xl font-bold mb-4">Manage Tokens</h1>
            <TokenForm />
            <h2 className="text-xl font-semibold mt-8 mb-4">Existing Tokens</h2>
            <TokensTable tokens={tokens} />
        </div>
    );
};

export default User;