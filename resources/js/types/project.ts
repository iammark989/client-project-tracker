export type ProjectStatus =
    | 'planning'
    | 'in_progress'
    | 'on_hold'
    | 'completed';

export type ProjectPriority =
    | 'low'
    | 'medium'
    | 'high';

export interface Project {
    id: number;
    client_name: string;
    project_name: string;
    description: string | null;
    status: ProjectStatus;
    priority: ProjectPriority;
    start_date: string;
    due_date: string;
}

export interface ProjectFormData {
    client_name: string;
    project_name: string;
    description: string;
    status: ProjectStatus;
    priority: ProjectPriority;
    start_date: string;
    due_date: string;
}