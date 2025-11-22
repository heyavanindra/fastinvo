"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { InvoiceTypes, TemplateTypes } from "@/lib/types";
import { invoiceSchema } from "@/lib/schema";
import { useDebouncedCallback } from "use-debounce";
import { InvoicePDF } from "./invoice-pdf";
import { createPdfBlob } from "@/lib/create-blob";
import { useMounted } from "@mantine/hooks";
interface InvoicePreviewProps {
  form: UseFormReturn<InvoiceTypes>;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ form }) => {
  const isMounted = useMounted()
  console.log("Is mounted", isMounted);
  const [data, setData] = React.useState(form.getValues());
  const [generatedPdfUrl, setGeneratedPdfUrl] = React.useState<string | null>(
    null,
  );
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const debounced = useDebouncedCallback(
    (value) => {
      console.log(value);
      setData(value);
    },
    // delay in ms
    1000,
  );

  React.useEffect(() => {
    const subscription = form.watch((value) => {
      console.log("website", value.website);

      const isParsed = invoiceSchema.safeParse(value);
      console.log("recievers name", isParsed.data?.reciever.name);
      console.log("website error", isParsed.error?.message);
      if (isParsed.success) {
        debounced(value as InvoiceTypes);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const generateBlog = async () => {
    try {
      const url = await createPdfBlob({
        invoiceData: data,
        template: "Default" as TemplateTypes,
      });
      const newUrl = URL.createObjectURL(url);
      setGeneratedPdfUrl(newUrl);
    } catch (err) {
      console.error(err);
      setGeneratedPdfUrl(null);
    }
  };

  React.useEffect(() => {
    generateBlog();
    return () => {
      if (generatedPdfUrl) {
        URL.revokeObjectURL(generatedPdfUrl);
      }
    };
  }, [data]);

  if (!isMounted || !generatedPdfUrl ) {
    return (
      <div className="flex h-[700px] w-full items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-orange-500"></div>
          <p className="text-gray-600">Generating PDF...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[700px] w-full items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return <InvoicePDF pdfUrl={generatedPdfUrl}></InvoicePDF>;
};

export default InvoicePreview;
