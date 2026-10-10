import api from "../api/axios";

const UserLogin = async (cred) => {
    const res = await api.post("/login", cred);
    return res.data;
}

const UserRegister = async (cred) => {
    const res = await api.post("/register", cred);
    return res.data;
}

export {UserLogin, UserRegister};