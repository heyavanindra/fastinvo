"use client";

import { InvoiceTypes } from "@/lib/types";
import { Controller, UseFormReturn } from "react-hook-form";
import InvoiceInput from "./ui/invoice-form/invoice-input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordian";
import React from "react";
import { FileUpload } from "./ui/file-upload";

const InvoiceForm = ({ form }: { form: UseFormReturn<InvoiceTypes> }) => {
  const { control, setValue } = form;

  const handleFileUpload = (files: File) => {
    setValue("logo", files);
  };

  return (
    <form>
      <Accordion type="single" collapsible>
        {/* Files Section */}
        <AccordionItem value="item-1">
          <AccordionTrigger>Files</AccordionTrigger>
          <AccordionContent className="flex justify-around items-center">
            {/*<FileUpload onChange={handleFileUpload} />
            <FileUpload onChange={handleFileUpload} />*/}
          </AccordionContent>
        </AccordionItem>

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
                    <label className="text-sm font-medium">Invoice Number</label>
                    <InvoiceInput
                      type="number"
                      field={field}
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
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
                    <InvoiceInput
                      type="date"
                      field={field}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                      placeHolder="Invoice Date"
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
                    <InvoiceInput
                      type="date"
                      field={field}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                      placeHolder="Due Date"
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
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
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
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
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
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
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
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                      placeHolder="Phone Number"
                    />
                  </div>
                )}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Items Section */}
        <AccordionItem value="item-6">
          <AccordionTrigger>Items</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <div className="flex justify-around items-center gap-4">
              <Controller
                name="items.0.name"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Item Name</label>
                    <InvoiceInput
                      type="text"
                      field={field}
                      onChange={(e) => field.onChange(e.target.value || "")}
                      placeHolder="Item Name"
                    />
                  </div>
                )}
              />
              <Controller
                name="items.0.desc"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Description</label>
                    <InvoiceInput
                      type="text"
                      field={field}
                      onChange={(e) => field.onChange(e.target.value || "")}
                      placeHolder="Description"
                    />
                  </div>
                )}
              />
            </div>
            <div className="flex justify-around items-center gap-4">
              <Controller
                name="items.0.quantity"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Quantity</label>
                    <InvoiceInput
                      type="number"
                      field={field}
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                      placeHolder="Quantity"
                    />
                  </div>
                )}
              />
              <Controller
                name="items.0.amount"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Amount</label>
                    <InvoiceInput
                      type="number"
                      field={field}
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                      placeHolder="Amount"
                    />
                  </div>
                )}
              />
              <Controller
                name="items.0.sum"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Sum</label>
                    <InvoiceInput
                      type="number"
                      field={field}
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                      placeHolder="Sum"
                    />
                  </div>
                )}
              />
            </div>
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
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                      placeHolder="Tax"
                    />
                  </div>
                )}
              />
              <Controller
                name="totalAmout"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Total Amount</label>
                    <InvoiceInput
                      type="number"
                      field={field}
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                      placeHolder="Total Amount"
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
    </form>
  );
};

export default InvoiceForm;