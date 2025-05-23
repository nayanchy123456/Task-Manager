import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import AddTaskForm from './AddTaskForm';
import EditTaskForm from './EditTaskForm';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);  // Store tasks in state
  const [taskSummary, setTaskSummary] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });
  const [showAllTasks, setShowAllTasks] = useState(false); // State to control task list visibility
  const [showAddTaskForm, setShowAddTaskForm] = useState(false); // State to control form visibility
  const [selectedTask, setSelectedTask] = useState(null); // State for selected task for view details modal
  const [editingTask, setEditingTask] = useState(null); // Track the task being edited


  // Fetch tasks from the backend when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/tasks');
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched tasks from backend:", data);
          setTasks(data);
          updateTaskSummary(data);
        } else {
          console.error('Error fetching tasks');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTasks();
  }, []);


  // Update task summary (total, completed, pending tasks)
  const updateTaskSummary = (data) => {
    const total = data.length;
    const completed = data.filter((task) => task.status === 'COMPLETED').length;
    const pending = total - completed;
    setTaskSummary({ total, completed, pending });
  };

  // Handler when a new task is added
  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setShowAddTaskForm(false);  // Close the form after adding a task
  };

  // Handler for task deletion
  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // If successfully deleted from the backend, remove from UI
        setTasks(tasks.filter(task => task.id !== taskId));
      } else {
        console.error('Failed to delete task from the backend');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };


  const handleUpdate = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditingTask(taskToEdit); // Open the edit form with the selected task

  };
  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null); // Close the edit form
  };


  // Handler for viewing task details
  const handleViewDetails = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    setSelectedTask(task);  
  };

  // Close the task details modal
  const closeTaskDetails = () => {
    setSelectedTask(null);  
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1 className="app-name">Task Manager</h1>
        <button className="logout-button">Logout</button>
      </header>

      {/* Task Summary Section */}
      <section className="task-summary">
        <div className="task-summary-item">
          <h3>Total Tasks</h3>
          <p className="summary-value">{taskSummary.total}</p>
        </div>
        <div className="task-summary-item">
          <h3>Completed Tasks</h3>
          <p className="summary-value">{taskSummary.completed}</p>
        </div>
        <div className="task-summary-item">
          <h3>Pending Tasks</h3>
          <p className="summary-value">{taskSummary.pending}</p>
        </div>
      </section>

      {/* Show All Tasks Button */}
      <button className="show-all-tasks-button" onClick={() => setShowAllTasks(!showAllTasks)}>
        {showAllTasks ? 'Hide All Tasks' : 'Show All Tasks'}
      </button>

      {/* Task List Section */}
      {showAllTasks && (
        <section className="task-list">
          <h2>Your Tasks</h2>
          {tasks.length === 0 ? (
            <p>No tasks available</p>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="task-card">
                <h4>{task.title}</h4>
                <p>Status: {task.status}</p>
                <p>Due Date: {task.dueDate}</p>
                <div className="task-actions">
                  <button className="task-action-btn" onClick={() => handleViewDetails(task.id)}>
                    View Details
                  </button>
                  <button className="task-action-btn" onClick={() => handleUpdate(task.id)}>
                    Update
                  </button>
                  <button className="task-action-btn" onClick={() => handleDelete(task.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      )}

      {/* Add Task Button */}
      <button className="add-task-button" onClick={() => setShowAddTaskForm(true)}>
        Add Task
      </button>

      {/* Show AddTaskForm if showAddTaskForm is true */}
      {showAddTaskForm && <AddTaskForm onTaskAdded={handleTaskAdded} />}

      {/* Task Details Modal */}
      {selectedTask && (
        <div className="task-details-modal">
          <div className="task-details-content">
            <h3>Task Details</h3>
            <p><strong>Title:</strong> {selectedTask.title}</p>
            <p><strong>Description:</strong> {selectedTask.description}</p>
            <p><strong>Status:</strong> {selectedTask.status}</p>
            <p><strong>Due Date:</strong> {selectedTask.dueDate}</p>
            <button className="close-button" onClick={closeTaskDetails}>Close</button>
          </div>
        </div>
      )}
      {editingTask && (
        <div className="edit-task-overlay">
          <EditTaskForm
            task={editingTask}
            onUpdate={handleTaskUpdated}
            onCancel={() => setEditingTask(null)}
          />
        </div>
      )}


    </div>
  );
};

export default Dashboard;
