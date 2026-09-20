import axios from 'axios';
import { Project, ProjectFormData } from '../types/project';

export const getProjects = async (): Promise<Project[]> => {
    const response = await axios.get('/api/projects');

    return response.data.data;
};

export const createProject = async (
    data: ProjectFormData
): Promise<Project> => {
    const response = await axios.post('/api/projects', data);

    return response.data.data;
};

export const updateProject = async (
    id: number,
    data: ProjectFormData
): Promise<Project> => {
    const response = await axios.put(`/api/projects/${id}`, data);

    return response.data.data;
};

export const deleteProject = async (id: number): Promise<void> => {
    await axios.delete(`/api/projects/${id}`);
};