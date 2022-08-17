import Success from '../domain/Success';
import { Token } from '../domain/Token';
import  {User, UserToCreate } from '../domain/User'
import logger from '../misc/logger';
import UserModel from '../models/UserModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/**
 * Get all the users
 * @returns {Promise<{users: User [], message: string}>}
 */
export const getAllUsers = async (): Promise<Success<User[]>> => {
  // Operation here
  logger.info('Getting all users');
  const users = await UserModel.getAllUsers()
  return {
    data: users,
    message: 'Users fetched successfully'
  };


};

/**
 * Get a single user by id.
 * @param {number} id
 * @returns {Promise<Success<User>>}
 */
 export const getUser = async (id: number): Promise<Success<User>> => {
  logger.info(`Getting user with id: ${id}`);
  // const user = await UserModel.getUser(userId);

  const user = await UserModel.getUser(id);
  if (user){
    return {
      data: user,
      message: "User fetched successfully",
    };

  } else{
    return {
      message: "User not found"
    }
  }

};


/**
 * Get a single user by id.
 * @param {string} email
 * @returns {Promise<Success<User>>}
 */
 export const getUserByEmail = async (email: string): Promise<Success<User>> => {
  logger.info(`Getting user with email: ${email}`);
  // const user = await UserModel.getUser(userId);

  const user = await UserModel.getUserByEmail(email);
  if (user){
    return {
      data: user,
      message: "User fetched successfully",
    };

  } else{
    return {
      message: "User not found"
    }
  }

};

/**
 * Create a new User.
 * @param {UserToInsert} user
 * @returns {Promise<Success<User>>}
 */
export const createUser = async (
  user: UserToCreate
): Promise<Success<User>> => {
  const insertedUser = await UserModel.createUser(user);

  // const insertedUser = await UserModel.createUser(user);
  logger.info("User created successfully");

  return {
    data: insertedUser,
    message: "User created successfully",
  };
};

/**
 * Update an existing user.
 * @param {User} user
 * @returns {Promise<Success<User>>}
 */
 export const updateUser = async (user: User): Promise<Success<User>> => {
  // const updatedUser = await UserModel.updateUser(user);
  const updatedUser = await UserModel.updateUser(user);
  logger.info("User updated successfully");

  return {
    data: updatedUser,
    message: "User updated successfully",
  };
};

/**
 * Delete an existing user.
 * @param {number} id
 * @returns {Promise<Success<User>>}
 */
export const deleteUser = async (id: number): Promise<Success<User>> => {
  // await UserModel.deleteUser(userId);

  await UserModel.deleteUser(id);

  logger.info("User deleted successfully");
  

  return {
    message: "User deleted successfully",
  };
};

export const loginUser = async (email: string, password:string): Promise<Success<Token>> =>{
  logger.info("user logging in");
  const user = await UserModel.getUserByEmail(email);

  if (!user){
    return{
      message: "User not found",
    }
  }

  const isCorrect = bcrypt.compareSync(password, user.password);

  if (isCorrect) {
    const token = jwt.sign({id:user.id}, process.env.JWT_SECRET as string);
    return{
      data: {id: user.id, access_token: token},
      message: "Login Successful"    
    }

}

return{ 
  message: "Wrong password",
}
}

