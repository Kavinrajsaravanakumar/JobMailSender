import api from "../api/axios";


const GetUsers = async () => {
    const res = await api.get("/users");
    return res.data;
}


export {GetUsers};