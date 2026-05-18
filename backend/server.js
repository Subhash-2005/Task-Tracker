const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "https://tasktrackerr-nine.vercel.app/"
}));
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
  const newTask = {
    id: Date.now(),
    text: req.body.text
  };

  tasks.push(newTask);

  res.json(tasks);
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