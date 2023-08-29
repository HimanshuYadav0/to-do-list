import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const updateTask = (index, newText) => {
    if (newText !== null && newText.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[index].text = newText;
      setTasks(updatedTasks);
    }
  };

  const markAsComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1 className="mt-4">To-Do List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Type your task here..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTask();
            }
          }}
        />
        <button className="btn btn-primary" onClick={addTask}>
          Add
        </button>
      </div>
      <ul className="list-group">
        {tasks.map((task, index) => (
          task.deleted ? null : (
            <li
              key={index}
              className={`list-group-item ${task.completed ? 'completed' : ''}`}
            >
              {task.completed ? <s>{task.text}</s> : task.text}
              {!task.completed && (
                <button
                  className="btn btn-sm btn-success complete-button"
                  onClick={() => markAsComplete(index)}
                >
                  Mark as Complete
                </button>
              )}
              <button
                className="btn btn-sm btn-danger delete-button"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
              <button
                className="btn btn-sm btn-info update-button"
                onClick={() => updateTask(index, prompt('Enter new task text:') || null)}
              >
                Update
              </button>
            </li>
          )
        ))}
      </ul>
    </div>

    
  );
};

export default TodoList;
