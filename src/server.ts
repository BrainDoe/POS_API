import "dotenv/config";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";

const app = express();
import connectDB from "./utils/db-connection.util";

app.use(express.json());
app.use(cors());
app.use(helmet());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  connectDB()
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.error("Database connection failed:", error);
      process.exit(1);
    });
  console.log(`Server running on ${port}`);
});
