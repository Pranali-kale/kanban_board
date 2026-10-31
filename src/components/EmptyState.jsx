
function EmptyState({ message }) {
  return (
    <div className="bg-white/60 rounded-lg py-12 text-center">

      <div className="text-3xl mb-3">
        <span>📋</span>
      </div>

      <p className="text-slate-500 text-sm">
        {message}
      </p>

    </div>
  );
}

export default EmptyState;
