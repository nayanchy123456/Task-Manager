import React, { useState, useEffect } from 'react';
import './EditTaskForm.css';


const EditTaskForm = ({ task, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = { ...task, title, description, status, dueDate };
  
    console.log("Updated Task: ", updatedTask); // Debug log to verify the task data
  
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
  
      if (response.ok) {
        const updated = await response.json();
        console.log('Updated Task from server:', updated); // Check the response
        onUpdate(updated);
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {   
      console.error('Error updating task:', error);
    }
  };
  

  return (
    <form className="edit-task-form" onSubmit={handleSubmit}>
      <h3>Edit Task</h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="PENDING">Pending</option>
        <option value="COMPLETED">Completed</option>
      </select>
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
      <button type="submit">Save Changes</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditTaskForm;
