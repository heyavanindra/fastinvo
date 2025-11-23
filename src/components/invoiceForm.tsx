"use client";

import { InvoiceTypes } from "@/lib/types";
import { Controller, UseFormReturn, useFieldArray } from "react-hook-form";
import InvoiceInput from "./ui/invoice-form/invoice-input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordian";
import { useState } from "react";
import { Trash2, X } from "lucide-react";
import InvoiceDatePicker from "./ui/invoice-form/date-picker";

// Add Item Popup Component
const AddItemPopup = ({
  isOpen,
  onClose,
  onAdd,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: any) => void;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    quantity: 0,
    amount: 0,
    sum: 0,
  });

  const handleSubmit = () => {
    onAdd(formData);
    setFormData({ name: "", desc: "", quantity: 0, amount: 0, sum: 0 });
    onClose();
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      // Auto-calculate sum if quantity or amount changes
      if (field === "quantity" || field === "amount") {
        updated.sum = updated.quantity * updated.amount;
      }

      return updated;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 dark:bg-black/80  backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-900 rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto m-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Add New Item</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-medium">Item Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Item Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-medium">Description</label>
              <input
                type="text"
                value={formData.desc}
                onChange={(e) => handleChange("desc", e.target.value)}
                placeholder="Description"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-medium">Quantity</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) =>
                  handleChange("quantity", Number(e.target.value) || 0)
                }
                placeholder="Quantity"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-medium">Amount</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  handleChange("amount", Number(e.target.value) || 0)
                }
                placeholder="Amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-neutral-800 text-white rounded-md hover:bg-neutral-900 transition-colors"
            >
              Add Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InvoiceForm = ({ form }: { form: UseFormReturn<InvoiceTypes> }) => {
  const { control, setValue } = form;
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Use useFieldArray to manage dynamic items
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const handleFileUpload = (files: File) => {
    setValue("logo", files);
  };

  const addItem = (newItem: any) => {
    append(newItem);
  };

  return (
    <form>
      <Accordion type="single" collapsible>
        {/* Files Section */}
        {/*<AccordionItem value="item-1">
          <AccordionTrigger>Files</AccordionTrigger>
          <AccordionContent className="flex justify-around items-center">
            <FileUpload onChange={handleFileUpload} />
            <FileUpload onChange={handleFileUpload} />
          </AccordionContent>
        </AccordionItem>*/}

        {/* Company Details Section */}
        <AccordionItem value="item-2">
          <AccordionTrigger>Company Details</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <div className="flex justify-around items-center gap-4">
              <Controller
                name="componyName"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Company Name</label>
                    <InvoiceInput
                      type="text"
                      field={field}
                      onChange={(e) => field.onChange(e.target.value || "")}
                      placeHolder="Company Name"
                    />
                  </div>
                )}
              />
              <Controller
                name="website"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Website</label>
                    <InvoiceInput
                      type="text"
                      field={field}
                      onChange={(e) => field.onChange(e.target.value || "")}
                      placeHolder="Website"
                    />
                  </div>
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Email</label>
                    <InvoiceInput
                      type="email"
                      field={field}
                      onChange={(e) => field.onChange(e.target.value || "")}
                      placeHolder="Email"
                    />
                  </div>
                )}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Invoice Information Section */}
        <AccordionItem value="item-3">
          <AccordionTrigger>Invoice Information</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <div className="flex justify-around items-center gap-4">
              <Controller
                name="invoiceNumber"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">
                      Invoice Number
                    </label>
                    <InvoiceInput
                      type="text"
                      field={field}
                      onChange={(e) => field.onChange(e.target.value || 0)}
                      placeHolder="Invoice Number"
                    />
                  </div>
                )}
              />
              <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Subject</label>
                    <InvoiceInput
                      type="text"
                      field={field}
                      onChange={(e) => field.onChange(e.target.value || "")}
                      placeHolder="Subject"
                    />
                  </div>
                )}
              />
            </div>
            <div className="flex justify-around items-center gap-4">
              <Controller
                name="invoiceDate"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Invoice Date</label>
                    <InvoiceDatePicker
                      field={field}
                      onChange={(e) => {
                        const date = e.target.value
                          ? new Date(e.target.value)
                          : new Date();
                        field.onChange(date);
                      }}
                    />
                  </div>
                )}
              />
              <Controller
                name="dueDate"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Due Date</label>
                    <InvoiceDatePicker
                      field={field}
                      onChange={(e) => {
                        const date = e.target.value
                          ? new Date(e.target.value)
                          : new Date();
                        field.onChange(date);
                      }}
                    />
                  </div>
                )}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Sender Details Section */}
        <AccordionItem value="item-4">
          <AccordionTrigger>Sender Details</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <div className="flex justify-around items-center gap-4">
              <Controller
                name="sender.name"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Name</label>
                    <InvoiceInput
                      type="text"
                      field={field}
                      onChange={(e) => field.onChange(e.target.value || "")}
                      placeHolder="Sender Name"
                    />
                  </div>
                )}
              />
              <Controller
                name="sender.street"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Street</label>
                    <InvoiceInput
                      type="text"
                      field={field}
                      onChange={(e) => field.onChange(e.target.value || "")}
                      placeHolder="Street"
                    />
                  </div>
                )}
              />
              <Controller
                name="sender.city"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">City</label>
                    <InvoiceInput
                      type="text"
                      field={field}
                      onChange={(e) => field.onChange(e.target.value || "")}
                      placeHolder="City"
                    />
                  </div>
                )}
              />
            </div>
            <div className="flex justify-around items-center gap-4">
              <Controller
                name="sender.country"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Country</label>
                    <InvoiceInput
                      type="text"
                      field={field}
                      onChange={(e) => field.onChange(e.target.value || "")}
                      placeHolder="Country"
                    />
                  </div>
                )}
              />
              <Controller
                name="sender.pincode"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Pincode</label>
                    <InvoiceInput
                      type="number"
                      field={field}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value) || 0)
                      }
                      placeHolder="Pincode"
                    />
                  </div>
                )}
              />
              <Controller
                name="sender.phoneNo"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Phone Number</label>
                    <InvoiceInput
                      type="tel"
                      field={field}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value) || 0)
                      }
                      placeHolder="Phone Number"
                    />
                  </div>
                )}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Receiver Details Section */}
        <AccordionItem value="item-5">
          <AccordionTrigger>Receiver Details</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <div className="flex justify-around items-center gap-4">
              <Controller
                name="reciever.name"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Name</label>
                    <InvoiceInput
                      type="text"
                      field={field}
                      onChange={(e) => field.onChange(e.target.value || "")}
                      placeHolder="Receiver Name"
                    />
                  </div>
                )}
              />
              <Controller
                name="reciever.street"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Street</label>
                    <InvoiceInput
                      type="text"
                      field={field}
                      onChange={(e) => field.onChange(e.target.value || "")}
                      placeHolder="Street"
                    />
                  </div>
                )}
              />
              <Controller
                name="reciever.city"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">City</label>
                    <InvoiceInput
                      type="text"
                      field={field}
                      onChange={(e) => field.onChange(e.target.value || "")}
                      placeHolder="City"
                    />
                  </div>
                )}
              />
            </div>
            <div className="flex justify-around items-center gap-4">
              <Controller
                name="reciever.country"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Country</label>
                    <InvoiceInput
                      type="text"
                      field={field}
                      onChange={(e) => field.onChange(e.target.value || "")}
                      placeHolder="Country"
                    />
                  </div>
                )}
              />
              <Controller
                name="reciever.pincode"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Pincode</label>
                    <InvoiceInput
                      type="number"
                      field={field}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value) || 0)
                      }
                      placeHolder="Pincode"
                    />
                  </div>
                )}
              />
              <Controller
                name="reciever.phoneNo"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Phone Number</label>
                    <InvoiceInput
                      type="tel"
                      field={field}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value) || 0)
                      }
                      placeHolder="Phone Number"
                    />
                  </div>
                )}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Items Section - Now with Popup */}
        <AccordionItem value="item-6">
          <AccordionTrigger>Items ({fields.length})</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-6">
            {fields.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No items added yet. Click "Add Item" to get started.
              </div>
            ) : (
              fields.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-gray-200 rounded-lg p-4 relative"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-semibold">Item {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      <Trash2 className={"cursor-pointer"}></Trash2>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Name:</span>
                      <span className="ml-2">{field.name}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">
                        Description:
                      </span>
                      <span className="ml-2">{field.desc}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">
                        Quantity:
                      </span>
                      <span className="ml-2">{field.quantity}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Amount:</span>
                      <span className="ml-2">₹{field.amount}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Sum:</span>
                      <span className="ml-2 font-semibold">₹{field.sum}</span>
                    </div>
                  </div>
                </div>
              ))
            )}

            <button
              type="button"
              onClick={() => setIsPopupOpen(true)}
              className="mt-2 px-4 py-2 bg-neutral-800 text-white dark:bg-neutral-200 dark:text-neutral-800 font-semibold  rounded-md shadow-inner/30 border border-neutral-400 cursor-pointer shadow-neutral-100  transition-colors"
            >
              + Add Item
            </button>
          </AccordionContent>
        </AccordionItem>

        {/* Payment Details Section */}
        <AccordionItem value="item-7">
          <AccordionTrigger>Payment Details</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <div className="flex justify-around items-center gap-4">
              <Controller
                name="tax"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Tax</label>
                    <InvoiceInput
                      type="number"
                      field={field}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value) || 0)
                      }
                      placeHolder="Tax"
                    />
                  </div>
                )}
              />
            </div>
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Message</label>
                  <InvoiceInput
                    type="text"
                    field={field}
                    onChange={(e) => field.onChange(e.target.value || "")}
                    placeHolder="Message"
                  />
                </div>
              )}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Add Item Popup */}
      <AddItemPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onAdd={addItem}
      />
    </form>
  );
};

export default InvoiceForm;
