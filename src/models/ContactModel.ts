import db from "../db/db";
import { Contact, ContactToInsert } from "../domain/Contact";

class ContactModel {
  public static table = "contact";

  public static async getAllContacts(id: number) {
    const contacts = await db(ContactModel.table)
      .select(
        "id",
        "name",
        "phone",
        "email",
        "address",
        "photograph",
        "cloudinary_id",
        "user_id",
        "is_favourite_contact"
      )
      .where({ user_id: id })
      .orderBy("name", "asc")
      .orderBy("is_favourite_contact", "asc");

    return contacts;
  }

  public static async getContactById(id: number) {
    const contact = await db(ContactModel.table).where({ id }).first();
    return contact;
  }

  public static async getContactByName(name: string) {
    const contact = await db(ContactModel.table).where({ name }).first();
    return contact;
  }

  public static async createContact(contact: ContactToInsert) {
    const newContact = await db(ContactModel.table)
      .insert(contact)
      .returning("*");
    return newContact;
  }

  public static async updateContact(contact: Contact) {
    const updatedContact = await db(ContactModel.table)
      .where({ id: contact.id })
      .update(contact)
      .returning([
        "id",
        "name",
        "email",
        "photograph",
        "address",
        "cloudinary_id",
        "user_id",
        "is_favourite_contact",
      ]);
    return updatedContact;
  }

  public static async deleteContact(id: number) {
    const deletedContact = await db(ContactModel.table).where({ id }).del();
    return deletedContact;
  }
}

export default ContactModel;
