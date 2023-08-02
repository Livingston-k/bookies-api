import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import authorsRoute from "./routes/authors";
import { ErrorHandler } from "./middlewares/ErrorHandler";

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/authors', authorsRoute)
app.get("*", (req: Request, res: Response) => res.status(404).json({ message: 'route not found', success: false }));
app.use(ErrorHandler.handleErrors);

export default app;


// 2:35:42