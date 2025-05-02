
import { useEffect, useState } from 'react';
import './TaskList.css';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('/api/tasks');
                const data = await response.json();
                setTasks(data);
            } catch (err) {
                console.error('Error fetching tasks:', err);
            }
        };

        // Calling the async function directly within useEffect
        fetchTasks();
    }, []);

    return (
        <div className="task-list">
            <h2>Task List</h2>
            {tasks.length === 0 ? (
                <p>No tasks found.</p>
            ) : (
                <ul>
                    {tasks.map(task => (
                        <li key={task.id} className="task-item">
                            <strong>{task.title}</strong><br />
                            <span>{task.description}</span><br />
                            <small>Status: {task.status}</small><br />
                            <small>Due Date: {task.dueDate}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TaskList;
