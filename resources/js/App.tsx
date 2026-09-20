import { useEffect, useState } from 'react';
import ProjectForm from './components/ProjectForm';
import ProjectTable from './components/ProjectTable';
import {
    createProject,
    deleteProject,
    getProjects,
    updateProject,
} from './services/projectService';
import { Project, ProjectFormData } from './types/project';

export default function App() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [editingProject, setEditingProject] =
        useState<Project | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadProjects = async () => {
        try {
            setLoading(true);

            const data = await getProjects();

            setProjects(data);
        } catch {
            setError('Unable to load projects.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const handleCreate = async (data: ProjectFormData) => {
        await createProject(data);

        setShowForm(false);

        await loadProjects();
    };

    const handleUpdate = async (data: ProjectFormData) => {
        if (!editingProject) return;

        await updateProject(editingProject.id, data);

        setEditingProject(null);
        setShowForm(false);

        await loadProjects();
    };

    const handleDelete = async (project: Project) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${project.project_name}"?`
        );

        if (!confirmed) return;

        try {
            await deleteProject(project.id);

            await loadProjects();
        } catch {
            setError('Unable to delete project.');
        }
    };

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        setShowForm(true);
    };

    const handleNewProject = () => {
        setEditingProject(null);
        setShowForm(true);
    };

    return (
        <div className="min-h-screen bg-gray-100">

            <header className="bg-gray-900 text-white">
                <div className="mx-auto max-w-7xl px-6 py-6">
                    <h1 className="text-2xl font-bold">
                        Client Project Tracker
                    </h1>

                    <p className="mt-1 text-sm text-gray-400">
                        Manage client projects and monitor progress.
                    </p>
                </div>
            </header>

            <main className="mx-auto max-w-7xl space-y-6 px-6 py-8">

                {!showForm && (
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold">
                                Projects
                            </h2>

                            <p className="text-sm text-gray-500">
                                {projects.length} project
                                {projects.length !== 1 ? 's' : ''}
                            </p>
                        </div>

                        <button
                            onClick={handleNewProject}
                            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
                        >
                            + New Project
                        </button>
                    </div>
                )}

                {showForm && (
                    <ProjectForm
                        project={editingProject}
                        onSubmit={
                            editingProject
                                ? handleUpdate
                                : handleCreate
                        }
                        onCancel={() => {
                            setEditingProject(null);
                            setShowForm(false);
                        }}
                    />
                )}

                {error && (
                    <div className="rounded-lg bg-red-50 p-4 text-red-700">
                        {error}
                    </div>
                )}

                {!showForm && (
                    loading ? (
                        <div className="rounded-xl bg-white p-10 text-center shadow">
                            Loading projects...
                        </div>
                    ) : (
                        <ProjectTable
                            projects={projects}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )
                )}

            </main>
        </div>
    );
}