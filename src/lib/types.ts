import z from "zod";
import { invoiceSchema, templateSchema } from "./schema";

export type InvoiceTypes = z.infer<typeof invoiceSchema>

export type TemplateTypes = z.infer<typeof templateSchema>