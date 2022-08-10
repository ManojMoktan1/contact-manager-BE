export interface User{
    id: number;
    email:string;
    password:string;
}

export type UserToCreate = Omit<User, "id">;
