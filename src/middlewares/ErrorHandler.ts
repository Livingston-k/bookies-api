import { NextFunction, Request, Response } from "express"
import { EntityNotFoundError } from "typeorm";
import { ResponseUtl } from "../utils/Response";

export class ErrorHandler{
    static catchErrors(fn){
        return (req:Request,res:Response,next:NextFunction)=>{
            Promise.resolve(fn(req,res,next)).catch(next)
        }
    }

    static handleErrors(err:any,req:Request,res:Response,next:NextFunction) {
        if (err instanceof EntityNotFoundError) {
            return ResponseUtl.sendError(res, "Record you requested not found", 404, err.message)
        }
        if (err.message == "Invalid file type") {
            return ResponseUtl.sendError(res, "Invalid file type", 442, err.message)
        }
        return res.status(500).json({
            success: false,
            message: "something went wrong",
            err
        })

    }
}