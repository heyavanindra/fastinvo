import { z } from "zod";

export const invoiceSchema = z.object({
  componyName:z.string(),
  website:z.string(),
  logo:z.file().optional(),
  signature:z.file().optional(),
  invoiceNumber: z.number(),
  subject:z.string(),
  invoiceDate:z.date(),
  dueDate:z.date(),
  email: z.email(),
  sender: z.object({
    name: z.string(),
    street: z.string(),
    city: z.string(),
    country: z.string(),
    pincode: z.number(),
    phoneNo: z.number(),
  }),
  reciever: z.object({
    name: z.string(),
    street: z.string(),
    city: z.string(),
    country: z.string(),
    pincode: z.number(),
    phoneNo: z.number(),
  }),
  items: z.array(
    z.object({
      name:z.string(),
      desc:z.string(),
      quantity: z.number(),
      amount: z.number(),
      sum: z.number(),
    }),
  ),
  totalAmout: z.number(),
  tax: z.number(),
  message: z.string(),
});
