import { Document, Schema, model, Model } from 'mongoose';
import { boolean } from 'zod';

export interface User extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  emailVerified: boolean;
}

export interface UserModel extends Model<User> {
  isEmailToken(email: string, excludeUserId?: string): Promise<boolean>;
  isUsernameTaken(username: string, excludeUserId?: string): Promise<boolean>;
}

const userSchema = new Schema<User, UserModel>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    emailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.statics.isEmailTaken = async function (
  email: string,
  excludeUserId?: string
) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.statics.isUsernameTaken = async function (
  username: string,
  excludeUserId?: string
) {
  const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
  return !!user;
};

export const UserModel = model<User>('User', userSchema);
