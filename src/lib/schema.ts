import {z} from "zod";

export const invoiceSchema = z.object({
  invoiceNumber:z.number(),
  email:z.email(),
  sender:z.object({
    name:z.string(),
    street:z.string(),
    city:z.string(),
    country:z.string(),
    pincode:z.number(),
    phoneNo:z.number()
  }),
  reciever:z.object({
    name:z.string(),
    street:z.string(),
    city:z.string(),
    country:z.string(),
    pincode:z.number(),
    phoneNo:z.number(),
  }),
  items:z.array(z.object({
    item:z.string(),
    quantity:z.number(),
    amount:z.number(),
    sum:z.number()
  })),
  totalAmout:z.number(),
  tax:z.number(),
  message:z.string(),
})


