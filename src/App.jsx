import { useState , useEffect} from "react";

import TaskForm from "./components/TaskForm";
import KanbanColumn from "./components/KanbanColumn";
import SearchFilter from "./components/SearchFilter";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("kanbanTasks");

  return savedTasks ? JSON.parse(savedTasks) : [];
});
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Add Task
  const handleAddTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  // Edit Task
  const handleEditTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  // Delete Task
  const handleDeleteTask = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

   
    if (!confirmDelete) return;

    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
  };

   const handleStatusChange = (id, newStatus) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? { ...task, status: newStatus }
            : task
        )
      );
    };

  // Columns
  const columns = [
    { title: "Todo", color: "bg-blue-500" },
    { title: "In Progress", color: "bg-amber-500" },
    { title: "Completed", color: "bg-emerald-500" },
  ];

  // Search and Filter
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesPriority =
      priorityFilter === "All" ||
      task.priority === priorityFilter;

    const matchesStatus =
      statusFilter === "All" ||
      task.status === statusFilter;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  const hasActiveFilters =
    search.trim() !== "" ||
    priorityFilter !== "All" ||
    statusFilter !== "All";

  return (
    <div className="min-h-screen bg-slate-100">

      /* Navbar */
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                Kanban Board
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Manage your work efficiently
              </p>
            </div>

            <button
              onClick={() => {
                setEditingTask(null);
                setShowForm(true);
              }}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg font-medium transition"
            >
              + Add Task
            </button>

          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        /* Search and Filters */
        <SearchFilter
          search={search}
          setSearch={setSearch}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">

          {columns.map((column) => {

            const columnTasks = filteredTasks.filter(
              (task) => task.status === column.title
            );

            return (
              <KanbanColumn
                key={column.title}
                column={column}
                tasks={columnTasks}
                onEdit={(task) => {
                  setEditingTask(task);
                  setShowForm(true);
                }}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
                hasActiveFilters={hasActiveFilters}
              />
            );
          })}

        </div>

      </main>

      /* Task Form */
      {showForm && (
        <TaskForm
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
          editingTask={editingTask}
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}

    </div>
  );
}

export default App;
