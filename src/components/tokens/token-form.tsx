import { FormEvent, useState } from "react";

const TokenForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        duration: "",
        allowedOrigin: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                    Duration
                </label>
                <select id="duration" name="duration" value={formData.duration} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                    <option value="">Select Duration</option>
                    <option value="1h">1 Hour</option>
                    <option value="1d">1 Day</option>
                    <option value="1week">1 Week</option>
                    <option value="1month">1 Month</option>
                    <option value="1year">1 Year</option>
                    <option value="non_expiring">Non Expiring</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="allowedOrigin" className="block text-sm font-medium text-gray-700">
                    Allowed Origin
                </label>
                <input type="text" id="allowedOrigin" name="allowedOrigin" placeholder="*" value={formData.allowedOrigin} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                Create New Token
            </button>
        </form>
    );
};

export default TokenForm;
