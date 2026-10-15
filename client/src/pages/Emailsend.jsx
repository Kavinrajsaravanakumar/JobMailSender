import { useState } from "react";
import Button from "../components/Button"
import GradientDashboar from "../components/GradientDashboard"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import { sendMail } from "../services/emailService";


function Emailsend() {
    const [loading, setLoading] = useState("false");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        to: "",
        subject: "Application for Fullstack Developer Role",
        text: ` Respected Sir/Madam,
                
                I am Kavinraj S, a final-year B.Tech Information Technology student at Sri Shakthi Institute of Engineering and Technology, Coimbatore.
                I am writing to express my interest in software development opportunities at your organization.
                
                I have a strong foundation in Java, SQL, Reactjs, Nodejs, Expressjs, MongoDB along with hands-on experience developing real-world applications.
                My projects include a gamified environmental learning platform for school students and a laptop recommendation system built using the MERN stack.
                
                I also completed a 5-month remote Frontend Developer Internship at Rajini Tech Foundation,
                where I gained practical experience in React, Tailwind CSS, team collaboration, communication, and developing scalable and reusable frontend components.
                
                I am eager to apply my technical skills, learn from experienced professionals, and contribute meaningfully to your team.
                
                I have attached my resume for your consideration and would appreciate the opportunity to discuss my profile further.
                
                Thank you for your time and consideration.
                
                GitHub - https://github.com/Kavinrajsaravanakumar
                LinkedIn - https://www.linkedin.com/in/kavinraj-s-0a4481292
                Portfolio - https://v0-kavin-raj-portfolio.vercel.app/

                Kind regards,
                Kavinraj S 
                9994814266 
                kavinrajsaravanakumar@gmail.com`,
        html: "",
        userMail: "kavinrajsaravanakumar@gmail.com"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading("true");
            const res = await sendMail(formData);
            toast.success(res.message);
            setLoading("false");
            console.log(res.message);
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || "Failed to send email";
            toast.error(errorMsg);
            console.log(errorMsg);
        }
    }
    return (
        <div className="page">
            <GradientDashboar />
            <Button
                className="px-6 m-4"
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

            <div className=" flex justify-center items-center h-screen">
                <form
                    className="sm:w-[850px] w-full border border-gray-300/60 rounded-2xl px-6 py-5 bg-white/10 backdrop-blur-md"
                >
                    <div className="flex justify-between">
                        <div className="mb-4">
                            <p className="text-white text-lg font-semibold">
                                New Message
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center w-full border-b border-gray-300/40 py-3 gap-3">
                        <span className="text-gray-300 text-sm w-16">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#28dc04ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
                        </span>

                        <input
                            type="email"
                            name="to"
                            placeholder="Receiver's email"
                            className="flex-1 bg-transparent text-white outline-none border-none placeholder-gray-400"
                            value={formData.to}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex items-center w-full border-b border-gray-300/40 py-3 gap-3">
                        <span className="text-green-400 text-sm w-16">
                            Subject
                        </span>

                        <input
                            type="text"
                            name="subject"
                            placeholder="Enter subject"
                            className="flex-1 bg-transparent text-white outline-none border-none placeholder-gray-400"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="w-full mt-3">
                        <textarea
                            name="text"
                            placeholder="Write your message..."
                            className="w-full h-[400px] bg-transparent text-white outline-none border-none resize-none placeholder-gray-400 leading-6 [scrollbar-width:none]"
                            value={formData.text}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-300/40 pt-4">
                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                            <span>Kavinraj_S_Resume_FD.pdf</span>
                        </div>
                        <Button
                            className={`px-6 cursor-pointer ${loading == "true" ? "cursor-wait" : ""}`}
                            onClick={handleSubmit}
                            disabled={loading == "true"}
                        >
                            {loading == "true" ?
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.99994L16.25 7.82837M4.92157 19.0784L7.75 16.25M4.92157 4.99994L7.75 7.82837"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                :
                                "Send"}
                        </Button>

                    </div>
                </form>
            </div>
        </div>
    )
}
export default Emailsend;