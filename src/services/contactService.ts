import { Contact, ContactToInsert } from "../domain/Contact";
import Success from "../domain/Success";
import logger from "../misc/logger";
import ContactModel from "../models/ContactModel";
import { v2 as cloudinary } from "cloudinary";



export const getAllContacts  = async (): Promise<Success<Contact>> => {
    // Operation here
    logger.info('Getting all users');
    const contacts = await ContactModel.getAllContacts()
    return {
      data: contacts,
      message: 'All contacts fetched successfully'
    };
  
  };


  export const getContactById = async (id: number): Promise<Success<Contact>> => {
    logger.info(`Getting a contact by id: ${id}`);
    // const user = await UserModel.getUser(userId);
  
    const contact = await ContactModel.getContactById(id);
    if (contact){
      return {
        data: contact,
        message: "Contact fetched successfully",
      };
  
    } else{
      return {
        message: "Contact not found"
      }
    }
  
  };


  export const getContactByName = async (name: string): Promise<Success<Contact>> => {
    logger.info(`Getting contact by name ${name}`);
    // const user = await UserModel.getUser(userId);
  
    const contact = await ContactModel.getContactByName(name);
    if (contact){
      return {
        data: contact,
        message: "Contact fetched successfully",
      };
  
    } else{
      return {
        message: "Contact not found"
      }
    }
  
  };


  export const createContact = async (
    contact: ContactToInsert
  ): Promise<Success<Contact>> => {
    logger.info(`HELLEO OWLRLSDFKJSDF`);
    const insertedContact = await ContactModel.createContact(contact);
  
    // const insertedUser = await UserModel.createUser(user);
    logger.info("Contact created successfully");
  
    return {
      data: insertedContact,
      message: "Contact created successfully",
    };
  };  

  export const updateContact = async (contact: Contact): Promise<Success<Contact>> => {
    logger.info("contact is updating");
    const updatedContact = await ContactModel.updateContact(contact);
    logger.info("Contact updated successfully");
  
    return {
      data: updatedContact,
      message: "Contact updated successfully",
    };
  };
  

  export const deleteContact = async (id: number): Promise<Success<Contact>> => {
    // await UserModel.deleteUser(userId);
    const contact = await ContactModel.getContactById(id);

    try{
      await cloudinary.uploader.destroy(contact.cloudinary_id, (result:any) => {
        logger.info(result);
      }
      )
    }catch (err) {
      logger.error(err);
    }
  
    await ContactModel.deleteContact(id);
  
    logger.info("Contact deleted successfully");
    
  
    return {
      message: "Contact deleted successfully",
    };
  };