import { useState } from 'react';

function AddDeadlineForm({ onAdd, onClose }) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [type, setType] = useState('assignment');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, subject, type, dueDate, priority });
    setTitle('');
    setSubject('');
    setDueDate('');
    setPriority('medium');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Add Deadline</h2>

        <input
          type="text"
          placeholder="Title (e.g. Lab Report 3)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3"
          required
        />
        <input
          type="text"
          placeholder="Subject (e.g. Analog Electronics)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3"
          required
        />

        <select value={type} onChange={(e) => setType(e.target.value)} className="w-full border rounded px-3 py-2 mb-3">
          <option value="assignment">Assignment</option>
          <option value="exam">Exam</option>
          <option value="project">Project</option>
          <option value="other">Other</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3"
          required
        />

        

        <div className="flex gap-2">
          <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Add
          </button>
          <button type="button" onClick={onClose} className="flex-1 bg-gray-200 py-2 rounded hover:bg-gray-300">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddDeadlineForm;