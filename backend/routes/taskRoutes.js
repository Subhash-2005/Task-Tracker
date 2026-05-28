const express = require("express");

const router = express.Router();

let tasks = [
  {
    id: 1,
    text: "Learn CI/CD"
  }
];

router.get("/", (req, res) => {
  res.json(tasks);
});

router.post("/", (req, res) => {
  try {
    if (!req.body.text) {
      return res.status(400).json({
        message: "Task text required"
      });
    }

    const newTask = {
      id: Date.now(),
      text: req.body.text
    };

    tasks.push(newTask);

    res.json(tasks);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  tasks = tasks.filter((task) => task.id !== id);

  res.json(tasks);
});

module.exports = router;