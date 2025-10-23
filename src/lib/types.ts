import z from "zod";
import { invoiceSchema } from "./schema";

export type InvoiceTypes = z.infer<typeof invoiceSchema>