import { Model } from 'mongoose';

export type TProduct = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  isDeleted: boolean;
  orders: TProduct[];
};

export interface UserStaticModel extends Model<TUser> {
  isUserExists1(userId: number): Promise<TUser | null>;
  isUserExists2(username: string): Promise<TUser | null>;
}
