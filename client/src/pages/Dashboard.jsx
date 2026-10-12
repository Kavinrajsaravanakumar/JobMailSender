import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GradientDashboard from "../components/GradientDashboard.jsx"
import Button from "../components/Button.jsx";
import api from "../api/axios.js"
import UsersTable from "../components/UsersTable.jsx";
import { useState, useEffect } from "react";
import { GetUsers } from "../services/userServices.js";
import EmailsTable from "../components/EmailsTable.jsx";
import { DeleteEmail } from "../services/emailService.js"

function Dashboard() {

    const [users, setUsers] = useState([]);
    const [emails, setEmails] = useState([]);
    const [showUserTable, setShowUserTable] = useState("false");
    const [showEmailTable, setShowEmailTable] = useState("false");

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("Logged-out Successfully");
        navigate("/");
    }
    const getUsers = async () => {
        setShowUserTable(showUserTable == "true" ? "false" : "true");
        if (showUserTable == "false") {
            const res = await GetUsers();
            setUsers(res);
            console.log(res);
        }
    }
    const userMail = localStorage.getItem("userMail");
    const getEmails = async () => {
        try {
            setShowEmailTable(showEmailTable == "true" ? "false" : "true");
            if (showEmailTable == "false") {
                const res = await api.get(`/email/getEmails/${userMail}`);
                setEmails(res.data);
                console.log(res.data);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Error fetching emails");
        }
    }
    const handleDelete = async (id) => {
        try {
            setUsers((prev) => prev.filter((user) => user._id !== id));
            const res = await api.delete(`/users/${id}`);
            toast.success(res.data.message);

        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Error deleting user");
        }
    };
    const handleUpdate = async (id, updatedUser) => {
        try {
            const resd = await api.get("http://localhost:3000/users");
            setUsers(resd.data);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Error updating user");
        }
    }

    const handleDeleteEmail = async (id) => {
        try {
            setEmails((prev) => prev.filter((mail) => mail._id !== id));
            const res = await DeleteEmail(id);
            toast.success(res.message);
        } catch (err) {
            toast.error(err.message);
            console.log(err);
        }
    }
    return (<>
        <div className="flex m-4 justify-between ">
            <Button
                className="px-6 "
                onClick={() => navigate(-1)}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20 12H4M4 12L10 18M4 12L10 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </Button>
            <Button onClick={handleLogout} >
                <div className="flex items-center justify-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16 17L21 12M21 12L16 7M21 12H9M9 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    Logout
                </div>
            </Button>
        </div>
        <div className="page flex flex-col justify-center items-center">
            <div className=" flex justify-center items-center gap-5 p-50">
                <GradientDashboard />
                <Button onClick={getUsers}>
                    <div className="flex items-center justify-center gap-2">
                        {showUserTable == "false" ?
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M22 21V19C22 17.1362 20.7252 15.5701 19 15.126M15.5 3.29076C16.9659 3.88415 18 5.32131 18 7C18 8.67869 16.9659 10.1159 15.5 10.7092M17 21C17 19.1362 17 18.2044 16.6955 17.4693C16.2895 16.4892 15.5108 15.7105 14.5307 15.3045C13.7956 15 12.8638 15 11 15H8C6.13623 15 5.20435 15 4.46927 15.3045C3.48915 15.7105 2.71046 16.4892 2.30448 17.4693C2 18.2044 2 19.1362 2 21M13.5 7C13.5 9.20914 11.7091 11 9.5 11C7.29086 11 5.5 9.20914 5.5 7C5.5 4.79086 7.29086 3 9.5 3C11.7091 3 13.5 4.79086 13.5 7Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg> :
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M16.5 16L21.5 21M21.5 16L16.5 21M15.5 3.29076C16.9659 3.88415 18 5.32131 18 7C18 8.67869 16.9659 10.1159 15.5 10.7092M12 15H8C6.13623 15 5.20435 15 4.46927 15.3045C3.48915 15.7105 2.71046 16.4892 2.30448 17.4693C2 18.2044 2 19.1362 2 21M13.5 7C13.5 9.20914 11.7091 11 9.5 11C7.29086 11 5.5 9.20914 5.5 7C5.5 4.79086 7.29086 3 9.5 3C11.7091 3 13.5 4.79086 13.5 7Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                        }
                        Get Users
                    </div>
                </Button>
                <Button onClick={getEmails} >
                    <div className="flex items-center justify-center gap-2">
                        {showEmailTable == "false" ?
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M21.5 18L14.8571 12M9.14286 12L2.50003 18M2 7L10.1649 12.7154C10.8261 13.1783 11.1567 13.4097 11.5163 13.4993C11.8339 13.5785 12.1661 13.5785 12.4837 13.4993C12.8433 13.4097 13.1739 13.1783 13.8351 12.7154L22 7M6.8 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.27976 20 5.11984 20 6.8 20Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            :
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13.744 2.63346L21.272 7.52667C21.538 7.69957 21.671 7.78602 21.7674 7.90134C21.8527 8.00342 21.9167 8.12149 21.9558 8.24865C22 8.39229 22 8.55092 22 8.86818V16.1999C22 17.88 22 18.7201 21.673 19.3619C21.3854 19.9263 20.9265 20.3853 20.362 20.6729C19.7202 20.9999 18.8802 20.9999 17.2 20.9999H6.8C5.11984 20.9999 4.27976 20.9999 3.63803 20.6729C3.07354 20.3853 2.6146 19.9263 2.32698 19.3619C2 18.7201 2 17.88 2 16.1999V8.86818C2 8.55092 2 8.39229 2.04417 8.24865C2.08327 8.12149 2.14735 8.00342 2.23265 7.90134C2.32901 7.78602 2.46201 7.69957 2.72802 7.52667L10.256 2.63346M13.744 2.63346C13.1127 2.22315 12.7971 2.01799 12.457 1.93817C12.1564 1.86761 11.8436 1.86761 11.543 1.93817C11.2029 2.01799 10.8873 2.22315 10.256 2.63346M13.744 2.63346L20.9681 7.32913C21.312 7.55268 21.484 7.66445 21.5435 7.8062C21.5956 7.93008 21.5956 8.06969 21.5435 8.19356C21.484 8.33531 21.312 8.44709 20.9681 8.67064L13.744 13.3663C13.1127 13.7766 12.7971 13.9818 12.457 14.0616C12.1564 14.1321 11.8436 14.1321 11.543 14.0616C11.2029 13.9818 10.8873 13.7766 10.256 13.3663L3.03193 8.67064C2.68801 8.44709 2.51604 8.33531 2.45649 8.19356C2.40444 8.06969 2.40444 7.93008 2.45649 7.8062C2.51604 7.66445 2.68801 7.55268 3.03193 7.32913L10.256 2.63346"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        }
                        Email History
                    </div>
                </Button>
                <Button>
                    <div onClick={() => navigate("/email")} className="flex items-center justify-center gap-2">
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <path
                                d="M10.4995 13.5001L20.9995 3.00005M10.6271 13.8281L13.2552 20.5861C13.4867 21.1815 13.6025 21.4791 13.7693 21.566C13.9139 21.6414 14.0862 21.6415 14.2308 21.5663C14.3977 21.4796 14.5139 21.1821 14.7461 20.587L21.3364 3.69925C21.5461 3.16207 21.6509 2.89348 21.5935 2.72185C21.5437 2.5728 21.4268 2.45583 21.2777 2.40604C21.1061 2.34871 20.8375 2.45352 20.3003 2.66315L3.41258 9.25349C2.8175 9.48572 2.51997 9.60183 2.43326 9.76873C2.35809 9.91342 2.35819 10.0857 2.43353 10.2303C2.52043 10.3971 2.81811 10.5128 3.41345 10.7444L10.1715 13.3725C10.2923 13.4195 10.3527 13.443 10.4036 13.4793C10.4487 13.5114 10.4881 13.5509 10.5203 13.596C10.5566 13.6468 10.5801 13.7073 10.6271 13.8281Z"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Send Mail
                    </div>
                </Button>
            </div>
            {showUserTable === "true" &&
                <div className="flex justify-center items-center mt-10 mb-50">
                    <UsersTable users={users} onDelete={handleDelete} onUpdate={handleUpdate} />
                </div>
            }
            {showEmailTable === "true" &&
                <div className="flex justify-center items-center mt-10 mb-50">
                    <EmailsTable emails={emails} onDeleteEmail={handleDeleteEmail} />
                </div>}
        </div>

    </>
    );
};

export default Dashboard;


