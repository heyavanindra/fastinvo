import z from "zod";
import { invoiceSchema } from "./schema";

export type invoiceTypes = z.infer<typeof invoiceSchema>