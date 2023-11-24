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
   isDeleted:z.boolean(),
});

export default UserSchemaForZod;
