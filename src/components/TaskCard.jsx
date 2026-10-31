
function TaskCard({

   task,
  onEdit,
  onDelete,
  onStatusChange,

}) {
  const getPriorityStyle = (priority) => {
    if (priority === "High")
      return "bg-red-100 text-red-700";

    if (priority === "Medium")
      return "bg-yellow-100 text-yellow-700";

    return "bg-green-100 text-green-700";
  };

  return (
    <article className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition break-words">

      {/* Title and Priority */}
      <div className="flex justify-between items-start gap-2 mb-3">

        <h3 className="font-semibold text-slate-800">
          {task.title}
        </h3>

        <span
          className={`shrink-0 text-xs px-2 py-1 rounded-full font-medium ${getPriorityStyle(task.priority)}`}
        >
          {task.priority}
        </span>

      </div>

      {/* Description */}
      <p className="text-sm text-slate-500 mb-4">
        {task.description || "No description provided."}
      </p>

      {/* Due Date */}
      <div className="text-xs text-slate-500 mb-4">
        Due: {task.dueDate}
      </div>

      {/* Change Status */}
      <div className="mb-4">

        <label className="block text-xs font-medium text-slate-600 mb-2">
          Change Status
        </label>

        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(task.id, e.target.value)
          }
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

      </div>

      {/* Edit and Delete */}
      <div className="flex justify-end gap-4 border-t pt-3">

        <button
          onClick={() => onEdit(task)}
          className="text-indigo-600 text-sm hover:underline"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 text-sm hover:underline"
        >
          Delete
        </button>

      </div>

    </article>
  );
}

export default TaskCard;
