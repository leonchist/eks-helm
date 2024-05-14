import bcrypt from 'bcryptjs';

export const encryptPassword = async(password:string):Promise<string> => {
    const hashPassword = await bcrypt.hash(password, 8);
    return hashPassword;
}
import bcyrpt from "bcryptjs";

export const comparePassword = async (
  normalPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcyrpt.compare(normalPassword, hashedPassword);
};
