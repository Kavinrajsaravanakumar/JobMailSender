import { useState } from "react";

export default function UsersTable({ users, onDelete, onUpdate }) {
    const [sortField, setSortField] = useState("name");
    const [sortDir, setSortDir] = useState("asc");


    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortField(field);
            setSortDir("asc");
        }
    };

    const sortedUsers = [...users].sort((a, b) => {
        const first = a[sortField];
        const second = b[sortField];
        if (typeof first === "string") {
            const cmp = first.localeCompare(second);
            return sortDir === "asc" ? cmp : -cmp;
        }
        return 0;
    });

    const SortIcon = ({ field }) => {
        if (sortField !== field) return <span className="text-gray-300 ml-1">↕</span>;
        return <span className="ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>;
    };

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className=" backdrop-blur-md text-white">
                    <tr>
                        <th
                            onClick={() => handleSort("name")}
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer select-none"
                        >
                            User <SortIcon field="name" />
                        </th>
                        <th
                            onClick={() => handleSort("email")}
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer select-none"
                        >
                            Email <SortIcon field="email" />
                        </th>
                        <th
                            onClick={() => handleSort("createdAt")}
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer select-none"
                        >
                            Created <SortIcon field="createdAt" />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Updated
                        </th>

                        <th className="px-6 py-3">Actions</th>
                    </tr>
                </thead>

                <tbody className="bg-white/10 backdrop-blur-md divide-y divide-gray-100">
                    {sortedUsers.map((user, idx) => (
                        <tr
                            key={user._id}
                            className={idx % 2 === 0 ? "backdrop-blur-md" : "backdrop-blur-md"}
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div>
                                        <p className="text-sm font-medium text-white">{user.name}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                {formatDate(user.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                {formatDate(user.updatedAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center justify-end gap-3">
                                    <button
                                        onClick={() => onUpdate?.(user)}
                                        className="text-sm font-medium text-green-400 hover:text-green-600 hover:bg-green-100 transition bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg cursor-pointer"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete?.(user._id)}
                                        className="text-sm font-medium text-red-500 hover:bg-red-100 transition bg-white/10 backdrop-blur-md px-3 py-1 rounded-md cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}