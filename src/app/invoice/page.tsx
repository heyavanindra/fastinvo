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

const InvoicePreview = dynamic(() => import("../_sections/invoice-preview"), {
  ssr: false,
});



const InvoiceCreate = ({}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState("create");

  const defaultValues = {
    componyName: "CompaniesName",
    website: "www.website.com",
    email: "example@gmail.com",
    invoiceNumber: 123456,
    subject: "Your Subject",
    invoiceDate: new Date(),
    items: [
      { name: "Item 1", desc: "hello", quantity: 1, amount: 100, sum: 100 },
    ],
    tax: 0,
    dueDate: new Date(),
    totalAmout: 0,
    message: "Please pay with in 15 days",
    sender: {
      city: "Demo City",
      country: "India",
      name: "Panda inc",
      phoneNo: +9123233232323,
      pincode: 222222,
      street: "Demo street",
    },
    reciever: {
      city: "Lucknow",
      country: "India",
      name: "Recievers Name",
      phoneNo: 948850233,
      pincode: 334345,
      street: "Aawadh Streets",
    },
  };

  const form = useForm<InvoiceTypes>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: defaultValues,
  });

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { id: "create", label: "Create Invoice", icon: "M12 4v16m8-8H4" },
    { id: "invoices", label: "All Invoices", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { id: "customers", label: "Customers", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
    { id: "settings", label: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
  ];

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 flex">
      {/* Sidebar - Desktop */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ 
          width: sidebarCollapsed ? 80 : 280,
          x: 0 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden lg:block relative bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 overflow-hidden"
      >
        <div className="flex flex-col h-screen">
          {/* Sidebar Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6 border-b border-neutral-200 dark:border-neutral-800 shrink-0"
          >
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 rounded-xl bg-linear-to-br from-neutral-700 to-neutral-900 dark:from-neutral-600 dark:to-neutral-800 flex items-center justify-center shadow-lg shrink-0"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </motion.div>
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 whitespace-nowrap">InvoicePro</h2>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap">v2.0</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveNav(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200 text-left
                  ${activeNav === item.id
                    ? 'bg-neutral-900 dark:bg-neutral-800 text-white shadow-lg'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/50'
                  }
                  ${sidebarCollapsed ? 'justify-center' : ''}
                `}
                title={sidebarCollapsed ? item.label : ''}
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <AnimatePresence>
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="font-medium text-sm whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </nav>

        
          {/* Collapse Button - Desktop */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute z-30 right-0 top-20 w-6 h-6 rounded-full bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 shadow-lg flex items-center justify-center hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors "
          >
            <motion.svg
              animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-3 h-3 text-neutral-600 dark:text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </motion.svg>
          </motion.button>
        </div>
      </motion.aside>

      {/* Sidebar - Mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800"
            >
              <div className="flex flex-col h-full">
                {/* Sidebar Header */}
                <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-neutral-700 to-neutral-900 dark:from-neutral-600 dark:to-neutral-800 flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">FastInvo</h2>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">v1.0</p>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors lg:hidden"
                  >
                    <svg className="w-5 h-5 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setActiveNav(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-lg
                        transition-all duration-200 text-left
                        ${activeNav === item.id
                          ? 'bg-neutral-900 dark:bg-neutral-800 text-white shadow-lg'
                          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/50'
                        }
                      `}
                    >
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                      <span className="font-medium text-sm">{item.label}</span>
                    </motion.button>
                  ))}
                </nav>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-600 to-neutral-800 flex items-center justify-center text-white font-semibold">
                      JD
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">John Doe</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">john@example.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* Mobile Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
          </>
        )}
      </AnimatePresence>

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
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="border-b border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm flex-shrink-0"
            >
              <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                <div className="flex items-center gap-3">
                  {/* Mobile Menu Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <svg className="w-6 h-6 text-neutral-700 dark:text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </motion.button>

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
                    className="lg:hidden px-3 sm:px-4 py-2 rounded-lg bg-neutral-800 dark:bg-neutral-700 text-white text-sm font-medium shadow-lg hover:shadow-xl transition-shadow"
                  >
                    {showPreview ? "Edit" : "Preview"}
                  </motion.button>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <ModeToggle />
                  </motion.div>
                </div>
              </div>
            </motion.div>

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
                      <InvoicePreview form={form} />
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
                      <InvoicePreview form={form} />
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