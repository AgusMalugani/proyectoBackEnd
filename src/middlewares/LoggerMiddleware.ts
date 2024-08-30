import { NextFunction, Request, Response } from "express"

export function LoggerMiddleware(req:Request,res:Response,next:NextFunction){
    const date = new Date().toLocaleDateString(); // Solo la fecha
    const time = new Date().toLocaleTimeString(); // Solo la hora
console.log("req",req.url, req.method, date , time);
next();

}





