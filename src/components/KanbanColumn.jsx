
import TaskCard from "./TaskCard";
import EmptyState from "./EmptyState";

function KanbanColumn({
  column,
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
  hasActiveFilters,
}) {

  return (
    <section className="bg-slate-200/70 rounded-xl p-4 sm:p-5 min-w-0">

      {/* Column Header */}
      <div className="flex items-center justify-between mb-5">

        <div className="flex items-center gap-2">

          <span
            className={`w-3 h-3 rounded-full ${column.color}`}
          />

          <h2 className="font-bold text-lg text-slate-800">
            {column.title}
          </h2>

        </div>

        <span className="bg-white text-slate-600 text-sm font-semibold px-3 py-1 rounded-full">
          {tasks.length}
        </span>

      </div>

      /* Tasks */
      <div className="space-y-4">

        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))
        ) : (
          <EmptyState
            message={
              hasActiveFilters
                ? "No matching tasks found"
                : "No tasks yet"
            }
          />
        )}

      </div>

    </section>
  );
}

export default KanbanColumn;
