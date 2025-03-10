import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.post("/", (req, res) => {
  console.log(req.body);
  res.json({message: "Data received", data: req.body});
});

const port = process.env.PORT || 5100;
app.listen(port, () => console.log(`Server running on port ${port}...`));
