import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import CustomError from "../misc/CustomError";
import logger from "../misc/logger";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../constants/common";

import * as userService from "../services/userService";

export const getAllUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  userService
    .getAllUsers()
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * Get a single user.
 * @param {Request} req
 * @param {Response} res
 */
export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  userService
    .getUser(+id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * Get a single user.
 * @param {Request} req
 * @param {Response} res
 */
export const getUserByEmail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  userService
    .getUserByEmail(email)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * Create a new user.
 * @param {Request} req
 * @param {Response} res
 */
export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
    userService
      .createUser({ ...req.body, password: hash })
      .then((data) => res.json(data))
      .catch((err) => next(err));
  });
};

/**
 * Update an existing user.
 * @param {Request} req
 * @param {Response} res
 */
export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { email, password } = req.body;

  if (!id || !email || !password) {
    logger.error("Missing parameters user Id or name or email");
    throw new CustomError(
      "User Id, Name and email are required",
      StatusCodes.BAD_REQUEST
    );
  }
  bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
    userService
      .updateUser({ ...req.body, password: hash, id: +id })
      .then((data) => res.json(data))
      .catch((err) => next(err));
  });
};

/**
 * Delete an existing user.
 * @param {Request} req
 * @param {Response} res
 */
export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  userService
    .deleteUser(+id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
