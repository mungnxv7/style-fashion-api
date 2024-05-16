import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectDB } from "./src/config/db.js";
import routes from "./src/routes/index.js";

dotenv.config();
const app = express();
const URL_DB = process.env.MONGODB_URL;
const PORT = process.env.PORT;
app.use(bodyParser.json()); // to use body object in requests
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
connectDB(URL_DB, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/v1", routes);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
