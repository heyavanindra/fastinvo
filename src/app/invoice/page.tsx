"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InvoiceForm from "@/components/invoiceForm";
import { invoiceSchema } from "@/lib/schema";
import { InvoiceTypes } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ModeToggle from "@/components/ui/mode-toggle";
import dynamic from "next/dynamic";

const PdfWorkerProvider = dynamic(
  () => import("@/components/pdf-worker-provider"),
  {
    ssr: false,
  },
);
import LogoSvg from "@/components/ui/logo-svg";
import { useIsClient } from "usehooks-ts";
import SideBarDesktop from "@/components/sidebar-desktop";
import SidebarMobile from "@/components/sidebar-mobile";
import TopBar from "@/components/top-bar";
const InvoicePreview = dynamic(() => import("../_sections/invoice-preview"), {
  ssr: false,
});

const InvoiceCreate = ({}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState("create");
  const isClient = useIsClient();
  const defaultValues = {
    componyName: "Your Company Name",
    website: "www.yourcompany.com",
    email: "billing@yourcompany.com",
    invoiceNumber: "10001",
    subject: "Services Rendered - Month Year",
    invoiceDate: new Date(),
    tax: 18, // Standard GST rate in India
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    message:
      "Payment is due within 30 days. Please include the invoice number with your payment. Thank you for your business!",
    sender: {
      city: "Your City",
      country: "India",
      name: "Your Company Name",
      phoneNo: 919876543210,
      pincode: 123456,
      street: "123 Your Street Name",
    },
    reciever: {
      city: "Client City",
      country: "India",
      name: "Client Company Name",
      phoneNo: 919988776655,
      pincode: 654321,
      street: "456 Client Street Name",
    },
  };
  const form = useForm<InvoiceTypes>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: defaultValues,
  });

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 flex">
      {/* Sidebar - Desktop */}

      {/*<SideBarDesktop
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      ></SideBarDesktop>*/}
      {/* Sidebar - Mobile */}

      {/*<SidebarMobile
        SidebarOpen={sidebarOpen}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        setSidebarOpen={setSidebarOpen}
      ></SidebarMobile>*/}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-2 sm:p-4 md:p-6 h-screen overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-xl sm:rounded-2xl lg:rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Top Bar */}
            <TopBar
              form={form}
              setShowPreview={setShowPreview}
              showPreview={showPreview}
            ></TopBar>

            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden">
              {/* Desktop Layout */}
              <div className="hidden lg:grid lg:grid-cols-2 h-full">
                {/* Form Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="h-full overflow-y-auto border-r border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50"
                >
                  <div className="p-6 xl:p-12">
                    <InvoiceForm form={form} />
                  </div>
                </motion.div>

                {/* Preview Section */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="h-full overflow-y-auto bg-neutral-100/50 dark:bg-neutral-950/50"
                >
                  <div className="h-full flex justify-center items-start p-6 xl:p-12">
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="w-full max-w-2xl"
                    >
                      <div>
                        <PdfWorkerProvider>
                          <InvoicePreview form={form} />
                        </PdfWorkerProvider>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Mobile Layout */}
              <div className="lg:hidden h-full overflow-y-auto">
                <AnimatePresence mode="wait">
                  {!showPreview ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 sm:p-6"
                    >
                      <InvoiceForm form={form} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 sm:p-6 bg-neutral-100 dark:bg-neutral-950 flex justify-center items-center min-h-full"
                    >
                      {isClient ? (
                        <PdfWorkerProvider>
                          <InvoicePreview form={form} />
                        </PdfWorkerProvider>
                      ) : (
                        <div>Loading...</div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCreate;
