require("dotenv").config();
const express = require("express");
const { connectDb } = require("./config/db");

const apiRoutes = require("./routes");

const app = express();
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", apiRoutes);

const start = async () => {
  await connectDb(process.env.MONGODB_URI);

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
};

start().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
