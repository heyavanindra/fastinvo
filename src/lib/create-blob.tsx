import { pdf } from "@react-pdf/renderer";
import { InvoiceTypes, TemplateTypes } from "./types";
import { InvoiceDocument } from "@/components/templates/first-template";

interface CreatePdfBlobProps {
  invoiceData: InvoiceTypes;
  template: TemplateTypes;
}

export const createPdfBlob = async ({
  invoiceData,
  template,
}: CreatePdfBlobProps) => {
  const Template = getPdfTemplate(template);

  const pdfDocument = <Template data={invoiceData} />;
  const blob = await pdf(pdfDocument).toBlob();

  return blob;
};

const getPdfTemplate = ({ template }: TemplateTypes) => {
  if (!template) {
    return InvoiceDocument;
  }
  switch (template) {
    case "Default":
      return InvoiceDocument;
    case "Template1":
      return InvoiceDocument;
    default:
      return InvoiceDocument;
  }
};
