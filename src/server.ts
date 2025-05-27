import "dotenv/config";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";

const app = express();
import connectDB from "./utils/db-connection.util";
import AppError from "./utils/AppError.util";
import errorHandler from "./middleware/errorHandler.middleware";

app.use(express.json());
app.use(cors());
app.use(helmet());

const port = process.env.PORT || 3000;

// Catch 404 and forward to error handler
app.use((_: Request, _res: Response, next: NextFunction) => {
  next(new AppError("This route does not exist", 404));
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  errorHandler(err, req, res, next);
});

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
