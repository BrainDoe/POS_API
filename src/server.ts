import "dotenv/config";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
