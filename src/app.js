const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRouter = require("./routes/auth.routes");
const contentRouter = require("./routes/content.routes");
const progressRouter = require("./routes/progress.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "NihonGo! API is running" });
});

app.use("/api/auth", authRouter);
app.use("/api/content", contentRouter);
app.use("/api/progress", progressRouter);

app.use(errorMiddleware);

module.exports = app;
