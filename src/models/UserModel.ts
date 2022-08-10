import db from '../db/db';
import { User, UserToCreate } from '../domain/User';

class UserModel{
    public static table = "user_account";

    public static async getAllUsers(){
        const users = await db(UserModel.table).select("id", "email");
        return users;

    }
    public static async getUser(id: number): Promise<User> {
        const user = await db(UserModel.table)
          .where({ id: id })
          .select()
          .first();
    
        return user;
      }

      public static async getUserByEmail(email: string): Promise<User> {
        const user = await db(UserModel.table)
          .where({ email: email })
          .select()
          .first();
    
        return user;
      }

    public static async createUser(user: UserToCreate){
        const newUser = await db(UserModel.table).insert(user, [
            "id",
            "email",
            
        ]);
        return newUser;
    }

    public static async updateUser(user: User): Promise<User> {
        const [updatedUser] = await db(UserModel.table)
          .where({ id: user.id })
          .update(user)
          .returning(["id", "email"]);
    
        return updatedUser;
      }
    
      public static async deleteUser(id: number): Promise<void> {
        await db(UserModel.table).where({ id: id }).delete();
      }
    }
    


export default UserModel;