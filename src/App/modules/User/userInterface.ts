import { Model } from "mongoose";


export type TOrder ={
  ProductName: string,
  Price: number,
  Quantity:number,
  
}

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
  isActive: boolean,
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
   isDeleted:boolean;
   orders: TOrder[];
};

export interface UserStaticModel extends Model<TUser> {
  isUserExists(userId:number):Promise<TUser|null>;
}