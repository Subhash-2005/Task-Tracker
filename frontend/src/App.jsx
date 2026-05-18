import { useEffect, useState } from "react";

function App() {
  const API = import.meta.env.VITE_API_URL;

  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch(`${API}/tasks`);
    const data = await response.json();
    setTasks(data);
  };

  const addTask = async () => {
    if (!text.trim()) return;

    const response = await fetch(`${API}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    const data = await response.json();

    setTasks(data);
    setText("");
  };

  const deleteTask = async (id) => {
    const response = await fetch(`${API}/tasks/${id}`, {
      method: "DELETE"
    });

    const data = await response.json();
    setTasks(data);
  };

  return (
    <div className="container">
      <h1>Task Tracker</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text}

            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;