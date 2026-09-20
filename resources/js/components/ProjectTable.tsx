import { Project } from '../types/project';

interface Props {
    projects: Project[];
    onEdit: (project: Project) => void;
    onDelete: (project: Project) => void;
}

const statusLabels: Record<string, string> = {
    planning: 'Planning',
    in_progress: 'In Progress',
    on_hold: 'On Hold',
    completed: 'Completed',
};

export default function ProjectTable({
    projects,
    onEdit,
    onDelete,
}: Props) {
    if (projects.length === 0) {
        return (
            <div className="rounded-xl bg-white p-10 text-center shadow">
                <p className="text-gray-500">
                    No projects found.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl bg-white shadow">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-sm">
                        <tr>
                            <th className="px-5 py-4">Client</th>
                            <th className="px-5 py-4">Project</th>
                            <th className="px-5 py-4">Status</th>
                            <th className="px-5 py-4">Priority</th>
                            <th className="px-5 py-4">Start</th>
                            <th className="px-5 py-4">Due</th>
                            <th className="px-5 py-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {projects.map((project) => (
                            <tr
                                key={project.id}
                                className="hover:bg-gray-50"
                            >
                                <td className="px-5 py-4 font-medium">
                                    {project.client_name}
                                </td>

                                <td className="px-5 py-4">
                                    {project.project_name}
                                </td>

                                <td className="px-5 py-4">
                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                        {statusLabels[project.status]}
                                    </span>
                                </td>

                                <td className="px-5 py-4">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                                            project.priority === 'high'
                                                ? 'bg-red-100 text-red-700'
                                                : project.priority === 'medium'
                                                    ? 'bg-yellow-100 text-yellow-700'
                                                    : 'bg-green-100 text-green-700'
                                        }`}
                                    >
                                        {project.priority}
                                    </span>
                                </td>

                                <td className="px-5 py-4 text-sm text-gray-600">
                                    {project.start_date}
                                </td>

                                <td className="px-5 py-4 text-sm text-gray-600">
                                    {project.due_date}
                                </td>

                                <td className="px-5 py-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onEdit(project)}
                                            className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm hover:bg-gray-200"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => onDelete(project)}
                                            className="rounded-lg bg-red-50 px-3 py-1.5 text-sm text-red-600 hover:bg-red-100"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}