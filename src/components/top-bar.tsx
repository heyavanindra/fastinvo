"use client";
import * as React from "react";
import { motion } from "motion/react";
import ModeToggle from "./ui/mode-toggle";
import { InvoiceTypes, TemplateTypes } from "@/lib/types";
import { UseFormReturn } from "react-hook-form";
import { createPdfBlob } from "@/lib/create-blob";
import { invoiceSchema } from "@/lib/schema";
import { useDebouncedCallback } from "@mantine/hooks";

interface TopBarProps {
  setShowPreview: (a: boolean) => void;
  showPreview: boolean;
  form: UseFormReturn<InvoiceTypes>;
}

const TopBar = ({ setShowPreview, showPreview, form }: TopBarProps) => {
  const [data, setData] = React.useState(form.getValues());
  const [generatedPdfUrl, setGeneratedPdfUrl] = React.useState<string | null>(
    null,
  );
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
  }, []);

  const generateBlog = async () => {
    try {
      const url = await createPdfBlob({
        invoiceData: data,
        template: "Default" as TemplateTypes,
      });
      const newUrl = URL.createObjectURL(url);
      return newUrl;
    } catch (err) {
      console.error(err);
      setGeneratedPdfUrl(null);
    }
  };
  const downloadPdf = async () => {
    const url = await generateBlog();
    if (!url) {
      alert("no url");
      return;
    }
    const link = document.createElement("a");
    link.setAttribute("id", "temp-download-link");
    link.href = url;
    link.download = "invoice.pdf";
    link.click();
    document.getElementById("temp-download-link")?.remove();
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="border-b border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm shrink-0"
      >
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}

            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                Create Invoice
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 hidden sm:block">
                Design and preview your invoice
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Preview Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPreview(!showPreview)}
              className="lg:hidden px-3  sm:px-2 py-1 rounded-md bg-neutral-200 text-neutral-900 dark:text-neutral-50 dark:border-neutral-200/20 dark:bg-neutral-700 border border-neutral-600/20 font-medium shadow-lg hover:shadow-xl transition-shadow"
            >
              {showPreview ? "Edit" : "Preview"}
            </motion.button>
            <div>
              <button
                className={
                  "bg-neutral-800 text-neutral-100 dark:text-neutral-900 dark:bg-neutral-100   cursor-pointer  px-3  sm:px-2 py-1 rounded-md"
                }
                onClick={downloadPdf}
              >
                Download
              </button>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ModeToggle />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TopBar;
