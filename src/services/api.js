import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:4000/",
});

export const loginService = async (username, password) => {
    return api.post("/auth", {username, password});
};

export const getProjects = async () => {
    setUsernameHeader();
    return api.get("/projects");
};

export const createProject = async (project) => {
    return api.post("/project", project);
};

export const updateProject = async (project) => {
    setUsernameHeader();
    return api.put(`/projects/${project.id}`, project);
};

export const searchProjectById = async (projectId) => {
    return api.get(`/project/${projectId}`);
};

export const deleteProject = async (projectId) => {
    setUsernameHeader();
    return api.delete(`/projects/${projectId}`);
};

export const doneProject = async (projectId) => {
    setUsernameHeader();
    return api.patch(`/projects/${projectId}/done`);
};


const setUsernameHeader = () => {
    const loggedUser = localStorage.getItem('loggedUser');
    let username;
    if(loggedUser){
      username = JSON.parse(loggedUser).username;
    }
    api.defaults.headers.username = username;
}