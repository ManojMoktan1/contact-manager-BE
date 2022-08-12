import { Request, Response, NextFunction } from "express";

import * as contactService from "../services/contactService";
import { v2 as cloudinary } from "cloudinary";
import logger from "../misc/logger";

export const getAllContacts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  contactService
    .getAllContacts()
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const getContactById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  contactService
    .getContactById(+id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const getContactByName = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  contactService
    .getContactByName(name)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const createContact = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { file, name, phone, email, address } = req.body;
  logger.info(process.env.CLOUDINARY_NAME);
  cloudinary.uploader.upload(
    file,
    { resource_type: "image" },
    (err, result) => {
      if (err) {
        logger.info(`error is ${err.message}`);
        return next(err);
      }
      logger.info(";sdjf;kajdskfl;jakl;dfjlsdjf");
      logger.info(JSON.stringify(result));
      contactService
        .createContact({
          name,
          phone,
          email,
          address,
          photograph: result?.url as string,
          cloudinary_id: result?.public_id as string,
        })
        .then((data) => res.json(data))
        .catch((Error) => next(Error));
    }
  );
};

export const updateContact = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, file, name, phone, email, address, cloudinary_id } = req.body;
try{
  cloudinary.uploader.upload(
    file,
    { resource_type: "image", public_id: cloudinary_id },
    (err, result) => {
      if (err) {
        logger.info(`error is ${err.message}`);
        return next(err);
      }
      logger.info(JSON.stringify(result));
      contactService
        .updateContact({
          id,
          name,
          phone,
          email,
          address,
          photograph: result?.url as string,
          cloudinary_id: result?.public_id as string,
        })
        .then((data) => res.json(data))
        .catch((Error) => next(Error));
    }
  );

}catch(err) {
  logger.info(`error is ${err}`);
}

};

export const deleteContact = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
contactService
.deleteContact(+id)
.then((data) => res.json(data))
.catch((Error) => next(Error));
}