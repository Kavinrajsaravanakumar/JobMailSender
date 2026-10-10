import api from "../api/axios";

const sendMail = async (formData) => {
    const res = await api.post("/email/send", formData);
    return res.data;
}


export { sendMail };