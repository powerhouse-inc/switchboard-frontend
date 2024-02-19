export interface Token {
    name: string;
    type: string;
    token: string;
    expiresAt: string; // You might want to use a Date object here if applicable
    allowedOrigins: string[];
    status: "Active" | "Inactive"; // Assuming status can only be one of these two
}

export const TokensTable = ({ tokens }: { tokens: Token[] }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Token
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Expires At
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Allowed Origins
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {tokens.map((token, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{token.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{token.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{token.token}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{token.expiresAt}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{token.allowedOrigins}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${token.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{token.status}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {/* Add action buttons here */}
                                <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                <button className="text-red-600 hover:text-red-900 ml-2">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TokensTable;
