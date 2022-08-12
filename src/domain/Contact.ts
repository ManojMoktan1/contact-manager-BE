export interface Contact{
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    photograph: string;
    cloudinary_id: string;
}

export type ContactToInsert = Omit<Contact, "id">;