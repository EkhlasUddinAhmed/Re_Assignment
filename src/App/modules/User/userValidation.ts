import * as z from 'zod';

const FullNameSchema = z.object({
  firstName: z
    .string({
      required_error: 'First Name is required',
      invalid_type_error: 'First Name must be a string',
    })
    .trim(),
  lastName: z
    .string({
      required_error: 'Last Name is required',
      invalid_type_error: 'Last Name must be a string',
    })
    .trim(),
});

const AddressSchema = z.object({
  street: z
    .string({
      required_error: 'Street is required',
      invalid_type_error: 'Street must be a string',
    })
    .trim(),
  city: z
    .string({
      required_error: 'City is required',
      invalid_type_error: 'City must be a string',
    })
    .trim(),
  country: z
    .string({
      required_error: 'Country is required',
      invalid_type_error: 'Country must be a string',
    })
    .trim(),
});

export const ProductSchema = z.object({
  productName: z
    .string({
      required_error: 'Product Name is required',
      invalid_type_error: 'Product Name must be a string',
    })
    .trim(),
  price: z.number({
    required_error: 'Price is required',
    invalid_type_error: 'Price must be a number',
  }),
  quantity: z.number({
    required_error: 'Quantity is required',
    invalid_type_error: 'Quantity must be a number',
  }),
});

const UserSchemaForZod = z.object({
  userId: z.number({
    required_error: 'User Id is required and Should be unique',
    invalid_type_error: 'UserId must be a number',
  }),
  username: z
    .string({
      required_error: 'User Name is required and Should be unique',
      invalid_type_error: 'User Name must be a String',
    })
    .trim(),

  password: z
    .string({
      required_error: 'Password is required',

      invalid_type_error: 'Password must be a string',
    })
    .trim(),
  fullName: FullNameSchema,
  age: z.number({
    required_error: 'Age is required',
    invalid_type_error: 'Age must be a number',
  }),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email({ message: 'Invalid email format.' })
    .trim(),
  isActive: z.boolean().default(true),
  hobbies: z
    .array(
      z
        .string({
          required_error: 'Hobbies are required',
          invalid_type_error: 'Hobbies must be a string',
        })
        .trim(),
    ), 
  address: AddressSchema,
  isDeleted: z.boolean().default(false),
  orders: z.array(ProductSchema).default([]),
});

export default UserSchemaForZod;
