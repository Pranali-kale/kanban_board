
import { useState, useEffect } from "react";

function TaskForm({
  onAddTask,
  onEditTask,
  onClose,
  editingTask,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    status: "Todo",
  });

  useEffect(() => {
    if (editingTask) {
      setFormData(editingTask);
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
        status: "Todo",
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter task title");
      return;
    }

    if (!formData.dueDate) {
      alert("Please select due date");
      return;
    }

    if (editingTask) {
      onEditTask({
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
      });
    } else {
      onAddTask({
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
        id: Date.now(),
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-lg rounded-2xl bg-white p-5 sm:p-7 shadow-xl">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-xl font-bold text-slate-800">
            {editingTask ? "Edit Task" : "Add New Task"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-slate-500 hover:text-red-500"
          >
            &times;
          </button>

        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="mb-1 block text-sm font-medium">
              Task Title *
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              maxLength={100}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              rows="3"
              maxLength={500}
              className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Priority
            </label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Due Date *
            </label>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-3 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700"
            >
              {editingTask ? "Update Task" : "Add Task"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default TaskForm;
