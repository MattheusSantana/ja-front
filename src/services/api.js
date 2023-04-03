import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:4000/",
});

export const loginService = async (username, password) => {
    return api.post("/auth", {username, password});
};

export const getProjects = async () => {
    const loggedUser = localStorage.getItem('loggedUser');
    let username;
    if(loggedUser){
      username = JSON.parse(loggedUser).username;
    }
    api.defaults.headers.username = username;
    return api.get("/projects");
};

export const createProject = async (project) => {
    return api.post("/project", project);
};

export const updateProject = async (project) => {
    const loggedUser = localStorage.getItem('loggedUser');
    let username;
    if(loggedUser){
      username = JSON.parse(loggedUser).username;
    }
    api.defaults.headers.username = username;
    return api.put(`/projects/${project.id}`, project);
};

export const searchProjectById = async (projectId) => {
    return api.get(`/project/${projectId}`);
};