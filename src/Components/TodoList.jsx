import React, { useState, useEffect } from 'react';
import { Search, Trash2 } from 'lucide-react';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObj = {
        id: Date.now(),
        title: newTask,
        description: '',
        completed: false,
        lastUpdated: new Date().toISOString(),
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };

  const updateTask = (id, updates) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, ...updates, lastUpdated: new Date().toISOString() } : task
    ));
  };

  const toggleComplete = (id) => {
    updateTask(id, { completed: !tasks.find(task => task.id === id).completed });
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="search-bar">
        <Search size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tasks"
        />
      </div>
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <div className="task-header">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              {editingTask === task.id ? (
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) => updateTask(task.id, { title: e.target.value })}
                  onBlur={() => setEditingTask(null)}
                  autoFocus
                />
              ) : (
                <span onClick={() => setEditingTask(task.id)}>{task.title}</span>
              )}
              <button onClick={() => deleteTask(task.id)} className="delete-btn">
                <Trash2 size={16} />
              </button>
            </div>
            <div className="task-details">
              <textarea
                value={task.description}
                onChange={(e) => updateTask(task.id, { description: e.target.value })}
                placeholder="Add a description"
              />
              <p className="timestamp">Last updated: {new Date(task.lastUpdated).toLocaleString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;