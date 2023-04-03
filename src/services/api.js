import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:4000/",
});

export const loginService = async (username, password) => {
    return api.post("/auth", {username, password});
};

export const getProjects = async () => {
    return api.get("/projects");
};