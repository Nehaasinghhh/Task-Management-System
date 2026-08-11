import { useEffect, useState } from "react";
import {
  Plus,
  CheckCircle2,
  Circle,
  Pencil,
  Trash2,
  X,
  Save,
  ListTodo,
  Clock3,
  CheckCheck,
} from "lucide-react";

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

  
  const startEdit = (task) => {
    setEditingTask(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  
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
      alert(
        error.response?.data?.message ||
          "Failed to update task"
      );
    }
  };

 
  const toggleTask = async (task) => {
    try {
      await API.put(`/tasks/${task._id}`, {
        title: task.title,
        description: task.description,
        completed: !task.completed,
      });

      fetchTasks();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update task"
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks =
    tasks.length - completedTasks;

  return (
    <div className="min-h-screen bg-[#120B10]">

      <Navbar onLogout={logout} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <section className="relative mb-8 overflow-hidden rounded-3xl border border-[#4A2638] bg-[#1E1219] p-7 shadow-2xl shadow-black/20 sm:p-9">

          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#831843] opacity-30 blur-3xl" />

          <div className="absolute -bottom-20 right-40 h-48 w-48 rounded-full bg-[#E11D72] opacity-10 blur-3xl" />

          <div className="relative">

            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#F472B6]">
              Productivity dashboard
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-[#FDF2F8] sm:text-4xl">
              Welcome back 👋
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#B9A3AE] sm:text-base">
              Organize your work, focus on what matters,
              and keep moving forward.
            </p>

          </div>

        </section>

       
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-[#3A202D] bg-[#1E1219] p-5 transition hover:-translate-y-1 hover:border-[#831843]">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-[#8F6C7C]">
                  Total Tasks
                </p>

                <p className="mt-2 text-3xl font-bold text-[#FDF2F8]">
                  {tasks.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#831843]/20 text-[#F472B6]">
                <ListTodo size={23} />
              </div>

            </div>

          </div>

          <div className="rounded-2xl border border-[#3A202D] bg-[#1E1219] p-5 transition hover:-translate-y-1 hover:border-[#831843]">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-[#8F6C7C]">
                  Pending
                </p>

                <p className="mt-2 text-3xl font-bold text-[#FDF2F8]">
                  {pendingTasks}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#831843]/20 text-[#F472B6]">
                <Clock3 size={23} />
              </div>

            </div>

          </div>

          <div className="rounded-2xl border border-[#3A202D] bg-[#1E1219] p-5 transition hover:-translate-y-1 hover:border-green-900">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-[#8F6C7C]">
                  Completed
                </p>

                <p className="mt-2 text-3xl font-bold text-green-400">
                  {completedTasks}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-950/40 text-green-400">
                <CheckCheck size={23} />
              </div>

            </div>

          </div>

        </section>

      
        <section className="mb-10 rounded-3xl border border-[#3A202D] bg-[#1E1219] p-6 shadow-xl shadow-black/20 sm:p-7">

          <div className="mb-6 flex items-center gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#831843]/20 text-[#F472B6]">
              <Plus size={23} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#FDF2F8]">
                Add New Task
              </h3>

              <p className="mt-1 text-sm text-[#8F6C7C]">
                Add something you want to accomplish.
              </p>
            </div>

          </div>

          <form
            onSubmit={addTask}
            className="space-y-4"
          >

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#EBD8E2]">
                Task title
              </label>

              <input
                type="text"
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="w-full rounded-xl border border-[#3A202D] bg-[#120B10] px-4 py-3 text-[#FDF2F8] outline-none placeholder:text-[#705463] focus:border-[#E11D72] focus:ring-2 focus:ring-[#E11D72]/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#EBD8E2]">
                Description
              </label>

              <textarea
                rows="4"
                placeholder="Add some details..."
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                className="w-full resize-none rounded-xl border border-[#3A202D] bg-[#120B10] px-4 py-3 text-[#FDF2F8] outline-none placeholder:text-[#705463] focus:border-[#E11D72] focus:ring-2 focus:ring-[#E11D72]/20"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-5 py-3 font-semibold text-white shadow-lg shadow-[#E11D72]/20 transition hover:bg-[#BE185D] active:scale-95"
            >
              <Plus size={18} />
              Add Task
            </button>

          </form>

        </section>

       
        <section>

          <div className="mb-5 flex items-end justify-between">

            <div>

              <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[#F472B6]">
                Workspace
              </p>

              <h3 className="text-2xl font-bold text-[#FDF2F8]">
                My Tasks
              </h3>

              <p className="mt-1 text-sm text-[#8F6C7C]">
                Everything you need to get done.
              </p>

            </div>

            <span className="rounded-full border border-[#4A2638] bg-[#831843]/20 px-3 py-1.5 text-sm font-semibold text-[#F472B6]">
              {tasks.length}{" "}
              {tasks.length === 1 ? "task" : "tasks"}
            </span>

          </div>

        
          {tasks.length === 0 ? (

            <div className="rounded-3xl border border-dashed border-[#4A2638] bg-[#1E1219] px-6 py-16 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#831843]/20 text-[#F472B6]">
                <CheckCircle2 size={32} />
              </div>

              <h4 className="mt-5 text-lg font-bold text-[#FDF2F8]">
                No tasks yet
              </h4>

              <p className="mx-auto mt-2 max-w-sm text-sm text-[#8F6C7C]">
                Add your first task above and start
                getting things done.
              </p>

            </div>

          ) : (

            <div className="grid gap-5 md:grid-cols-2">

              {tasks.map((task) => (

                <div
                  key={task._id}
                  className={`rounded-3xl border bg-[#1E1219] p-5 shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:shadow-black/30 ${
                    task.completed
                      ? "border-green-900/60"
                      : "border-[#3A202D] hover:border-[#831843]"
                  }`}
                >

                 
                  {editingTask === task._id ? (

                    <div className="space-y-4">

                      <input
                        value={editTitle}
                        onChange={(e) =>
                          setEditTitle(e.target.value)
                        }
                        className="w-full rounded-xl border border-[#3A202D] bg-[#120B10] px-4 py-3 text-[#FDF2F8] outline-none focus:border-[#E11D72]"
                      />

                      <textarea
                        rows="3"
                        value={editDescription}
                        onChange={(e) =>
                          setEditDescription(
                            e.target.value
                          )
                        }
                        className="w-full resize-none rounded-xl border border-[#3A202D] bg-[#120B10] px-4 py-3 text-[#FDF2F8] outline-none focus:border-[#E11D72]"
                      />

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            updateTask(task._id)
                          }
                          className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#BE185D]"
                        >
                          <Save size={16} />
                          Save
                        </button>

                        <button
                          onClick={() =>
                            setEditingTask(null)
                          }
                          className="inline-flex items-center gap-2 rounded-xl border border-[#3A202D] px-4 py-2.5 text-sm font-semibold text-[#B9A3AE] hover:bg-[#831843]/20"
                        >
                          <X size={16} />
                          Cancel
                        </button>

                      </div>

                    </div>

                  ) : (

                    <>
                      
                      <div className="flex items-start gap-3">

                        <button
                          onClick={() =>
                            toggleTask(task)
                          }
                          className="mt-0.5 shrink-0 transition hover:scale-110"
                        >
                          {task.completed ? (
                            <CheckCircle2
                              size={25}
                              className="text-green-400"
                            />
                          ) : (
                            <Circle
                              size={25}
                              className="text-[#705463] hover:text-[#F472B6]"
                            />
                          )}
                        </button>

                        <div className="min-w-0 flex-1">

                          <div className="flex items-start justify-between gap-3">

                            <h4
                              className={`text-lg font-bold ${
                                task.completed
                                  ? "text-[#705463] line-through"
                                  : "text-[#FDF2F8]"
                              }`}
                            >
                              {task.title}
                            </h4>

                            {task.completed && (
                              <span className="shrink-0 rounded-full bg-green-950/50 px-2.5 py-1 text-xs font-semibold text-green-400">
                                Done
                              </span>
                            )}

                          </div>

                          <p
                            className={`mt-2 text-sm leading-6 ${
                              task.completed
                                ? "text-[#705463]"
                                : "text-[#B9A3AE]"
                            }`}
                          >
                            {task.description ||
                              "No description provided."}
                          </p>

                        </div>

                      </div>

                      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[#3A202D] pt-4">

                        <button
                          onClick={() =>
                            startEdit(task)
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-[#B9A3AE] transition hover:bg-[#831843]/20 hover:text-[#F472B6]"
                        >
                          <Pencil size={15} />
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteTask(task._id)
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-[#B9A3AE] transition hover:bg-red-950/30 hover:text-red-400"
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>

                        <button
                          onClick={() =>
                            toggleTask(task)
                          }
                          className="ml-auto rounded-lg px-3 py-2 text-sm font-bold text-[#F472B6] transition hover:bg-[#831843]/20 hover:text-[#F9A8D4]"
                        >
                          {task.completed
                            ? "Mark Pending"
                            : "Complete"}
                        </button>

                      </div>
                    </>
                  )}

                </div>

              ))}

            </div>

          )}

        </section>

      </main>
    </div>
  );
}

export default Dashboard;