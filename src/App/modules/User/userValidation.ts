import * as z from 'zod';

const FullNameSchema = z.object({
  firstName: z.string().regex(/^[a-zA-Z]+$/, {
    message: 'Invalid First Name. Give Only Alphabet Character',
  }),
  lastName: z.string().regex(/^[a-zA-Z]+$/, {
    message: 'Invalid Last Name. Give Only Alphabet Character',
  }),
});

const AddressSchema = z.object({
  street: z.string().trim(),
  city: z.string().regex(/^[a-zA-Z]+$/, {
    message: 'Invalid City Name. Give Only Alphabet Character',
  }),
  country: z.string().regex(/^[a-zA-Z]+$/, {
    message: 'Invalid Country Name. Give Only Alphabet Character',
  }),
});

export const ProductSchema = z.object({
  productName: z.string().regex(/^[a-zA-Z]+$/, {
    message: 'Invalid Product Name. Give Only Alphabet Character',
  }),
  price: z.number().positive({ message: 'Price Should be Positive Value' }),
  quantity: z
    .number()
    .int({
      message: 'Quantity must be an integer.',
    })
    .positive({ message: 'Quantity Should be Positive Value' })
    .min(1, { message: 'Quantity should be Minimum 1' }),
});

const OrderSchema = z.object({
  productName: z.string().regex(/^[a-zA-Z]+$/, {
    message: 'Invalid Product Name. Give Only Alphabet Character',
  }),
  price: z.number().positive({ message: 'Price Should be Positive Value' }),
  quantity: z
    .number()
    .int({
      message: 'Quantity must be an integer.',
    })
    .min(1, {
      message: 'Quantity must be at least 1.',
    })
    .positive({ message: 'Quantity Should be Positive Value' }),
});

const UserSchemaForZod = z.object({
  userId: z
    .number()
    .int({ message: 'UserId must be an integer.' })
    .positive({ message: 'UserId Should be Positive Value' }),
  username: z.string().regex(/^[a-zA-Z\s]+$/, {
    message: 'Username should contain only alphabetic characters and spaces.',
  }),
  password: z.string(),
  fullName: FullNameSchema,
  age: z
    .number()
    .int({ message: 'Age must be an integer.' })
    .min(5, {
      message: 'Age must be at least 5.',
    })
    .max(100, {
      message: 'Age cannot exceed 100.',
    })
    .positive({ message: 'Age Should be positive Value' }),
  email: z.string().email({ message: 'Invalid email format.' }),
  isActive: z.boolean().default(true),
  hobbies: z.array(
    z.string().regex(/^[a-zA-Z]+$/, {
      message: 'Invalid Hobby. Give Only Alphabet Character',
    }),
  ), // Assuming hobbies are optional strings
  address: AddressSchema,
  isDeleted: z.boolean().default(false),
  orders: z.array(OrderSchema).default([]),
});


export default UserSchemaForZod;
