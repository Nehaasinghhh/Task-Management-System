import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await API.get("/tasks");
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("GET TASKS ERROR:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // CREATE
  const addTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    try {
      await API.post("/tasks", {
        title,
        description,
      });

      setTitle("");
      setDescription("");

      fetchTasks();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to create task"
      );
    }
  };

  // DELETE
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);

      fetchTasks();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete task"
      );
    }
  };

  // START EDIT
  const startEdit = (task) => {
    setEditingTask(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  // UPDATE
  const updateTask = async (id) => {
    try {
      await API.put(`/tasks/${id}`, {
        title: editTitle,
        description: editDescription,
      });

      setEditingTask(null);
      setEditTitle("");
      setEditDescription("");

      fetchTasks();
    } catch (error) {
      console.error("UPDATE ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update task"
      );
    }
  };

  // COMPLETE / INCOMPLETE
  const toggleTask = async (task) => {
    try {
      await API.put(`/tasks/${task._id}`, {
        title: task.title,
        description: task.description,
        completed: !task.completed,
      });

      fetchTasks();
    } catch (error) {
      console.error("TOGGLE ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update task"
      );
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div>
      <Navbar onLogout={logout} />

      <h2>Add New Task</h2>

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />

        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <br />

        <button type="submit">
          Add Task
        </button>
      </form>

      <hr />

      <h2>My Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id}>
            {editingTask === task._id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) =>
                    setEditTitle(e.target.value)
                  }
                />

                <br />

                <textarea
                  value={editDescription}
                  onChange={(e) =>
                    setEditDescription(e.target.value)
                  }
                />

                <br />

                <button
                  onClick={() =>
                    updateTask(task._id)
                  }
                >
                  Save
                </button>

                <button
                  onClick={() =>
                    setEditingTask(null)
                  }
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3>
                  {task.completed ? "✅" : "⬜"}{" "}
                  {task.title}
                </h3>

                <p>{task.description}</p>

                <button
                  onClick={() =>
                    toggleTask(task)
                  }
                >
                  {task.completed
                    ? "Mark Incomplete"
                    : "Mark Complete"}
                </button>

                <button
                  onClick={() =>
                    startEdit(task)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteTask(task._id)
                  }
                >
                  Delete
                </button>
              </>
            )}

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;