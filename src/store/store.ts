// store.ts
import { create } from "zustand";
import { type InvoiceTypes } from "@/lib/types";

export const useStore = create<InvoiceTypes>(() => ({
  invoiceNumber: 0,
  email: "",
  sender: {
    name: "",
    street: "",
    city: "",
    country: "",
    pincode: 0,
    phoneNo: 0,
  },
  reciever: {
    name: "",
    street: "",
    city: "",
    country: "",
    pincode: 0,
    phoneNo: 0,
  },
  items: [
    {
      item: "",
      quantity: 0,
      amount: 0,
      sum: 0,
    },
  ],
  totalAmout: 0,
  tax: 0,
  message: "",
}));
