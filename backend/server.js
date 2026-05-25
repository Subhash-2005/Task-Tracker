const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: [
      "https://tasktrackerr-nine.vercel.app",
      /\.vercel\.app$/
    ]
  })
);
app.use(express.json());

let tasks = [
  {
    id: 1,
    text: "Learn CI/CD"
  }
];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
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

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  tasks = tasks.filter((task) => task.id !== id);

  res.json(tasks);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});