import api from "../api/axios";

const sendMail = async (formData) => {
    const res = await api.post("/email/send", formData);
    return res.data;
}

const DeleteEmail = async (id) => {
    const res = await api.delete(`/email/delete/${id}`);
    return res.data;
}

export { sendMail,DeleteEmail };