import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import CustomError from "../misc/CustomError";
import logger from "../misc/logger";


const verifyToken = async (req:Request, res:Response, next:NextFunction) => {
    logger.info("Validating token");

    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined"){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        jwt.verify(
            bearerToken,
            process.env.JWT_SECRET as string,
            (err, decoded) => {
                if (err) {
                next(new CustomError("Invalid token", StatusCodes.UNAUTHORIZED));
            }else{
                next();
            }
        }
        );
    }else{
        next(new CustomError("Invalid token", StatusCodes.UNAUTHORIZED));
    }


 };

 export default verifyToken;