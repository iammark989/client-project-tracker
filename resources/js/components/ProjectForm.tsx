import { FormEvent, useEffect, useState } from 'react';
import {
    Project,
    ProjectFormData,
    ProjectPriority,
    ProjectStatus,
} from '../types/project';

interface Props {
    project: Project | null;
    onSubmit: (data: ProjectFormData) => Promise<void>;
    onCancel: () => void;
}

const emptyForm: ProjectFormData = {
    client_name: '',
    project_name: '',
    description: '',
    status: 'planning',
    priority: 'medium',
    start_date: '',
    due_date: '',
};

export default function ProjectForm({
    project,
    onSubmit,
    onCancel,
}: Props) {
    const [form, setForm] = useState<ProjectFormData>(emptyForm);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (project) {
            setForm({
                client_name: project.client_name,
                project_name: project.project_name,
                description: project.description ?? '',
                status: project.status,
                priority: project.priority,
                start_date: project.start_date,
                due_date: project.due_date,
            });
        } else {
            setForm(emptyForm);
        }
    }, [project]);

    const updateField = (
        field: keyof ProjectFormData,
        value: string
    ) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (!form.client_name.trim()) {
            setError('Client name is required.');
            return;
        }

        if (!form.project_name.trim()) {
            setError('Project name is required.');
            return;
        }

        if (form.due_date < form.start_date) {
            setError('Due date cannot be earlier than start date.');
            return;
        }

        try {
            setLoading(true);
            await onSubmit(form);
        } catch (error: any) {
            const errors = error.response?.data?.errors;

            if (errors) {
                setError(
                    Object.values(errors)
                        .flat()
                        .join(' ')
                );
            } else {
                setError('Unable to save project.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={submit}
            className="rounded-xl bg-white p-6 shadow"
        >
            <div className="mb-6">
                <h2 className="text-xl font-semibold">
                    {project ? 'Edit Project' : 'New Project'}
                </h2>

                <p className="text-sm text-gray-500">
                    Enter the project information below.
                </p>
            </div>

            {error && (
                <div className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">

                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Client Name
                    </label>

                    <input
                        type="text"
                        value={form.client_name}
                        onChange={(e) =>
                            updateField('client_name', e.target.value)
                        }
                        className="w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-500"
                        placeholder="Enter client name"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Project Name
                    </label>

                    <input
                        type="text"
                        value={form.project_name}
                        onChange={(e) =>
                            updateField('project_name', e.target.value)
                        }
                        className="w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-500"
                        placeholder="Enter project name"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium">
                        Description
                    </label>

                    <textarea
                        value={form.description}
                        onChange={(e) =>
                            updateField('description', e.target.value)
                        }
                        rows={4}
                        className="w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-500"
                        placeholder="Project description"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Status
                    </label>

                    <select
                        value={form.status}
                        onChange={(e) =>
                            updateField(
                                'status',
                                e.target.value as ProjectStatus
                            )
                        }
                        className="w-full rounded-lg border px-3 py-2"
                    >
                        <option value="planning">Planning</option>
                        <option value="in_progress">In Progress</option>
                        <option value="on_hold">On Hold</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Priority
                    </label>

                    <select
                        value={form.priority}
                        onChange={(e) =>
                            updateField(
                                'priority',
                                e.target.value as ProjectPriority
                            )
                        }
                        className="w-full rounded-lg border px-3 py-2"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Start Date
                    </label>

                    <input
                        type="date"
                        value={form.start_date}
                        onChange={(e) =>
                            updateField('start_date', e.target.value)
                        }
                        className="w-full rounded-lg border px-3 py-2"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Due Date
                    </label>

                    <input
                        type="date"
                        value={form.due_date}
                        onChange={(e) =>
                            updateField('due_date', e.target.value)
                        }
                        className="w-full rounded-lg border px-3 py-2"
                    />
                </div>
            </div>

            <div className="mt-6 flex gap-3">
                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading
                        ? 'Saving...'
                        : project
                            ? 'Update Project'
                            : 'Create Project'}
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg border px-5 py-2.5 font-medium hover:bg-gray-50"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}