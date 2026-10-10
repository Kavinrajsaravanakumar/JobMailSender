import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import GradientDashboard from './GradientDashboard'
import Button from "./Button";
import { UserLogin, UserRegister } from "../services/authServices";

const Login = () => {

    const [state, setState] = useState("login")

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res =
                state === "login" ?
                    await UserLogin({ email: formData.email, password: formData.password }) :
                    await UserRegister({ name: formData.name, email: formData.email, password: formData.password });
            if (state === "register") {
                console.log("Registered in:", res.data);
                toast.success("Register Successfull !");
                setState("login");
            } else {
                console.log("Logged in:", res.message);
                localStorage.setItem("token", res.token);
                toast.success("Login Successfull !");
                localStorage.setItem("userMail", formData.email);
                navigate("/dashboard");

            }
        } catch (err) {
            console.log(err);
            const errorMsg = err.response?.data?.message || "Invalid credentials or something went wrong";
            toast.error(errorMsg);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }


    return (
        <>
            <GradientDashboard />
            <div>
                <form onSubmit={handleSubmit} className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white/10 backdrop-blur-md ">
                    <h1 className="text-white text-3xl mt-10 font-medium">{state === "login" ? "Login" : "Sign up"}</h1>
                    <p className="text-white text-sm mt-2">Please sign in to continue</p>
                    {state !== "login" && (
                        <div className="flex items-center mt-6 w-full border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 bg-white/10 backdrop-blur-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#28dc04ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-icon lucide-user-round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
                            <input type="text" name="name" placeholder="Name" className="text-white border-none outline-none ring-0 " value={formData.name} onChange={handleChange} required />
                        </div>
                    )}
                    <div className="flex items-center w-full mt-4 border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 bg-white/10 backdrop-blur-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#28dc04ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
                        <input type="email" name="email" placeholder="Email id" className="text-white border-none outline-none ring-0" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="flex items-center mt-4 w-full border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 bg-white/10 backdrop-blur-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#28dc04ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock-icon lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        <input type="password" name="password" placeholder="Password" className="text-white border-none outline-none ring-0" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="mt-4 text-left">
                        <button className="text-sm text-green-300" type="reset">Forget password?</button>
                    </div>
                    <Button type="submit" className="mt-2 w-full">
                        <div className="flex items-center justify-center gap-2">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11985 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H15M10 7L15 12M15 12L10 17M15 12L3 12"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            {state === "login" ? "Login" : "Sign up"}
                        </div>
                    </Button>
                    <p onClick={() => setState(prev => prev === "login" ? "register" : "login")} className="text-white text-sm mt-3 mb-11">{state === "login" ? "Don't have an account?" : "Already have an account?"} <a href="#" className="text-green-300 hover:underline">click here</a></p>
                </form>
                <Button type="submit" className="mt-2 w-full mt-5" onClick={() => navigate("/email")}>
                    Email
                </Button>
            </div>
        </>
    )
}

export default Login;