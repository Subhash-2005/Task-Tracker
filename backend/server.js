const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

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
app.use("/tasks", taskRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});