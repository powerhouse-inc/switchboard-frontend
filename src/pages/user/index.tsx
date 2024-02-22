import TokenForm from "@/components/tokens/token-form";
import TokensTable from "@/components/tokens/tokens-table";
import useAuth, { authStore } from "@/hooks/useAuth";
import { useEffect } from "react";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";

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
        <div className="flex flex-col gap-8">
            <div className="bg-white px-5 flex flex-row gap-4 items-center my-auto">
                <div className="flex py-2 border-b-4 border-orange-600 text-orange-500">API Tokens</div>
                <div className="flex grow justify-end">
                    <button>
                        <div className="flex flex-row items-center text-orange-400 hover:bg-gray-300 rounded">
                            <span className="w-20">Sign Out</span>{" "}
                            <span className="w-8">
                                <ArrowRightStartOnRectangleIcon className="text-orange-500" />
                            </span>
                        </div>
                    </button>
                </div>
            </div>
            <TokenForm />
            <div className="bg-white p-5 flex-flex-col gap-4">
                <div className="font-semibold  mb-4">Existing Tokens</div>
                <TokensTable />
            </div>
        </div>
    );
};

export default User;
