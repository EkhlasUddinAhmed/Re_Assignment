import * as z from 'zod';

const FullNameSchema = z.object({
  firstName: z.string({
    required_error: "FirstName is required",
  }).regex(/^[a-zA-Z]+$/, {
    message: 'Invalid First Name. Give Only Alphabet Character',
  }),
  lastName: z.string({
    required_error: "Last Name is required",
  }).regex(/^[a-zA-Z]+$/, {
    message: 'Invalid Last Name. Give Only Alphabet Character',
  }),
});

const AddressSchema = z.object({
  street: z.string({
    required_error: "Street is required",
  }).trim(),
  city: z.string({
    required_error: "City is required",
  }).regex(/^[a-zA-Z]+$/, {
    message: 'Invalid City Name. Give Only Alphabet Character',
  }),
  country: z.string({
    required_error: "Country is required",
  }).regex(/^[a-zA-Z]+$/, {
    message: 'Invalid Country Name. Give Only Alphabet Character',
  }),
});

export const ProductSchema = z.object({
  productName: z.string({
    required_error: "Product Name is required",
  }).regex(/^[a-zA-Z]+$/, {
    message: 'Invalid Product Name. Give Only Alphabet Character',
  }),
  price: z.number({
    required_error: "Price is required",
  }).positive({ message: 'Price Should be Positive Value' }),
  quantity: z
    .number({
      required_error: "Quantity is required",
    })
    .int({
      message: 'Quantity must be an integer.',
    })
    .positive({ message: 'Quantity Should be Positive Value' })
    .min(1, { message: 'Quantity should be Minimum 1' }),
});

const OrderSchema = z.object({
  productName: z.string({
    required_error: "Product Name is required",
  }).regex(/^[a-zA-Z]+$/, {
    message: 'Invalid Product Name. Give Only Alphabet Character',
  }),
  price: z.number({
    required_error: "Price is required",
  }).positive({ message: 'Price Should be Positive Value' }),
  quantity: z
    .number({
      required_error: "Quantity is required",
    })
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
    .number({
      required_error: "User Id is required",
    })
    .int({ message: 'UserId must be an integer.' })
    .positive({ message: 'UserId Should be Positive Value' }),
  username: z.string({
    required_error: "User Name is required",
  }).regex(/^[a-zA-Z\s]+$/, {
    message: 'Username should contain only alphabetic characters and spaces.',
  }),
  password: z.string({
    required_error: "Password is required",
  }).min(8,{message: "Password Must be at least 8 or more characters long"}).max(20,{message: "Password should not be more than 20 characters long"}),
  fullName: FullNameSchema,
  age: z
    .number({
      required_error: "Age is required",
    })
    .int({ message: 'Age must be an integer.' })
    .min(5, {
      message: 'Age must be at least 5.',
    })
    .max(100, {
      message: 'Age cannot exceed 100.',
    })
    .positive({ message: 'Age Should be positive Value' }),
  email: z.string({
    required_error: "Email is required",
  }).email({ message: 'Invalid email format.' }),
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
