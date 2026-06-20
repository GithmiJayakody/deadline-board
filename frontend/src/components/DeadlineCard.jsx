function getUrgencyColor(dueDate) {
  const now = new Date();
  const due = new Date(dueDate);
  const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'bg-gray-100 border-gray-400'; // overdue
  if (diffDays <= 2) return 'bg-red-50 border-red-400';
  if (diffDays <= 5) return 'bg-yellow-50 border-yellow-400';
  return 'bg-green-50 border-green-400';
}

function getDaysLeftText(dueDate) {
  const now = new Date();
  const due = new Date(dueDate);
  const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return `Overdue by ${Math.abs(diffDays)} day(s)`;
  if (diffDays === 0) return 'Due today!';
  if (diffDays === 1) return 'Due tomorrow';
  return `${diffDays} days left`;
}

function DeadlineCard({ deadline, onToggleComplete, onDelete }) {
  const colorClass = deadline.status === 'completed' ? 'bg-gray-50 border-gray-300' : getUrgencyColor(deadline.dueDate);

  return (
    <div className={`border-l-4 rounded-lg p-4 mb-3 shadow-sm ${colorClass}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className={`font-semibold text-lg ${deadline.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {deadline.title}
          </h3>
          <p className="text-sm text-gray-600">{deadline.subject} • {deadline.type}</p>
          <p className="text-sm mt-1 font-medium">
            {deadline.status === 'completed' ? 'Completed ✅' : getDaysLeftText(deadline.dueDate)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Due: {new Date(deadline.dueDate).toLocaleDateString()}</p>
        </div>

        <div className="flex flex-col gap-2 ml-3">
          <button
            onClick={() => onToggleComplete(deadline._id)}
            className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {deadline.status === 'completed' ? 'Undo' : 'Done'}
          </button>
          <button
            onClick={() => onDelete(deadline._id)}
            className="text-xs px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeadlineCard;