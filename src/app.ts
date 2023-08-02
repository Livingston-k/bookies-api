import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import authorsRoute from "./routes/authors";
import { EntityNotFoundError } from "typeorm";
import { ResponseUtl } from "./utils/Response";

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/authors', authorsRoute)
app.get("*", (req: Request, res: Response) => res.status(404).json({ message: 'route not found', success: false }));
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof EntityNotFoundError) {
        return ResponseUtl.sendError(res, "Record you requested not found", 404, err.message)
    }

    if(err.message == "Invalid file type"){
        return ResponseUtl.sendError(res, "Invalid file type", 442, err.message)
    }
    return res.status(500).json({
        success: false,
        message: "something went wrong",
        err
    })
})

export default app;


