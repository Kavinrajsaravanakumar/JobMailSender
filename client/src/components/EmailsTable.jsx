export default function EmailsTable({ emails, onDeleteEmail }) {
    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 ">
                <thead className=" backdrop-blur-md text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer select-none ">
                            From
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer select-none">
                            To
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer select-none">
                            Subject
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Content
                        </th>
                        <th className="px-6 py-3  text-left text-xs font-medium uppercase tracking-wider">
                            Attachment
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="bg-white/10 backdrop-blur-md divide-y divide-gray-100">
                    {emails.map((email, idx) => (
                        <tr
                            key={email._id}
                            className={idx % 2 === 0 ? "backdrop-blur-md relative hover:z-40" : "backdrop-blur-md relative hover:z-40"}
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
                                        <p className="text-sm font-medium text-white">{email.userMail}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                {email.to}
                            </td>

                            <td className="px-6 py-4 text-sm text-white">
                                <div className="relative group max-w-[180px]">
                                    <p className="truncate cursor-default">{email.subject}</p>

                                    <div className="hidden group-hover:block absolute left-0 top-full z-50 pt-2">
                                        <div
                                            className="
                                                        w-72 max-h-60 overflow-y-auto
                                                        whitespace-pre-wrap break-words
                                                        p-3 rounded-2xl text-sm text-black
                                                        bg-white
                                                        border border-white/20
                                                        shadow-[0_8px_30px_rgba(0,0,0,0.6)]
                                                        [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.3)_transparent]
                                                    "
                                        >
                                            {email.subject}
                                        </div>
                                    </div>
                                </div>
                            </td>

                            {/* Content */}
                            <td className="px-6 py-4 text-sm text-white">
                                <div className="relative group max-w-[220px]">
                                    <p className="truncate cursor-default">{email.text}</p>

                                    <div className="hidden group-hover:block absolute left-0 top-full z-100 pt-2">
                                        <div
                                            className="
                                                        w-96 max-h-72 overflow-y-auto
                                                        whitespace-pre-wrap break-words
                                                        p-4 rounded-2xl text-sm text-black
                                                        bg-white
                                                        border border-white/20
                                                        shadow-[0_8px_30px_rgba(0,0,0,0.6)]
                                                        [scrollbar-width:thin] [scrollbar-color:rgba(6, 6, 6, 0.34)_transparent]
                                                    "
                                        >
                                            {email.text}
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                {email.attachments}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center justify-end gap-3">
                                    <button
                                        onClick={() => onDeleteEmail?.(email._id)}
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