import { Request, Response, NextFunction } from "express"
import  * as userService from "../services/userService"

export const login = (req:Request, res:Response, next:NextFunction) => {
    const {email, password} = req.body;
    userService
        .loginUser(email, password)
        .then((data) => res.json(data))
        .catch((err) =>next(err));

}