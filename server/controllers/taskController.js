const Task = require("../models/Task");


const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const task = await Task.create({
      title,
      description,
      user: req.userId,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("CREATE ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      tasks,
    });
  } catch (error) {
    console.error("GET ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("UPDATE ID:", id);
    console.log("USER ID:", req.userId);

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (task.user.toString() !== req.userId.toString()) {
      return res.status(403).json({
        message: "You are not allowed to update this task",
      });
    }

    if (req.body.title !== undefined) {
      task.title = req.body.title;
    }

    if (req.body.description !== undefined) {
      task.description = req.body.description;
    }

    if (req.body.completed !== undefined) {
      task.completed = req.body.completed;
    }

    const updatedTask = await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("DELETE ID:", id);
    console.log("USER ID:", req.userId);

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (task.user.toString() !== req.userId.toString()) {
      return res.status(403).json({
        message: "You are not allowed to delete this task",
      });
    }

    await Task.findByIdAndDelete(id);

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};