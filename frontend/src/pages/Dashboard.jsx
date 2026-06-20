import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import DeadlineCard from '../components/DeadlineCard';
import AddDeadlineForm from '../components/AddDeadlineForm';

function Dashboard() {
  const [deadlines, setDeadlines] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

  const fetchDeadlines = async () => {
    try {
      const res = await api.get('/deadlines');
      setDeadlines(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeadlines();
  }, []);

  const handleAdd = async (data) => {
    await api.post('/deadlines', data);
    fetchDeadlines();
  };

  const handleToggleComplete = async (id) => {
    await api.patch(`/deadlines/${id}/complete`);
    fetchDeadlines();
  };

  const handleDelete = async (id) => {
    await api.delete(`/deadlines/${id}`);
    fetchDeadlines();
  };

  const filteredDeadlines = deadlines.filter((d) => {
    if (filter === 'pending') return d.status === 'pending';
    if (filter === 'completed') return d.status === 'completed';
    return true;
  });

  const pendingCount = deadlines.filter((d) => d.status === 'pending').length;
  const overdueCount = deadlines.filter(
    (d) => d.status === 'pending' && new Date(d.dueDate) - new Date() < 0
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">📋 DeadlineBoard</h1>
            <p className="text-sm text-gray-500">Welcome back, {user.name}</p>
          </div>
          <button
            onClick={logout}
            className="text-sm text-gray-600 hover:text-red-500 border border-gray-300 px-3 py-1.5 rounded-md hover:border-red-300 transition"
          >
            Logout
          </button>
        </div>

        
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-gray-800">{deadlines.length}</p>
            <p className="text-xs text-gray-500">Total</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
            <p className="text-xs text-gray-500">Pending</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
            <p className="text-xs text-gray-500">Overdue</p>
          </div>
        </div>

        
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            {['all', 'pending', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                  filter === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition shadow-sm"
          >
            + Add Deadline
          </button>
        </div>

        
        {loading ? (
          <div className="text-center mt-16">
            <p className="text-gray-400 text-sm">Loading your deadlines...</p>
          </div>
        ) : filteredDeadlines.length === 0 ? (
          <div className="text-center mt-16 bg-white rounded-lg p-8 shadow-sm">
            <p className="text-4xl mb-2">🗓️</p>
            <p className="text-gray-500 font-medium">No deadlines here yet</p>
            <p className="text-gray-400 text-sm mt-1">Click "Add Deadline" to get started</p>
          </div>
        ) : (
          filteredDeadlines.map((deadline) => (
            <DeadlineCard
              key={deadline._id}
              deadline={deadline}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {showForm && <AddDeadlineForm onAdd={handleAdd} onClose={() => setShowForm(false)} />}
    </div>
  );
}

export default Dashboard;