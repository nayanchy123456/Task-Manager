// src/components/AddTaskForm.jsx
import { useState } from 'react';
import './AddTaskForm.css';

function AddTaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = { title, description, status: 'IN_PROGRESS', dueDate };

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        const data = await response.json();
        onTaskAdded(data);  // Trigger the parent component to update the task list
        clearForm();         // Clear form inputs after successful submit
      } else {
        console.error('Error adding task');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <h3>Add New Task</h3>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTaskForm;
