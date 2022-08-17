export interface Contact{
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    photograph: string;
    cloudinary_id: string;
    is_favourite_contact: boolean;
    user_id: number;
}

export type ContactToInsert = Omit<Contact, "id">;