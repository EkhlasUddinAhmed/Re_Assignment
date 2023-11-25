import * as z from 'zod';

const FullNameSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

export const ProductSchema = z.object({
  ProductName: z.string(),
  Price: z.number(),
  Quantity:z.number(),
  // ... other fields related to a product
});

const OrderSchema = z.object({
  ProductName: z.string(),
  Price: z.number(),
  Quantity:z.number()
  // ... other fields related to an order
});


const UserSchemaForZod = z.object({
  userId: z.number().int().positive(),
  username: z.string(),
  password: z.string(),
  fullName: FullNameSchema,
  age: z.number().int().positive(),
  email: z.string().email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()), // Assuming hobbies are optional strings
  address: AddressSchema,
  isDeleted: z.boolean().default(false),
  orders: z.array(OrderSchema).default([])
});

export default UserSchemaForZod;
