"use client";

import { Document as PDFDocument, Page, Text, View } from "@react-pdf/renderer";
import { InvoiceTypes } from "@/lib/types";
import { createTw } from "@hyperline/react-pdf-tailwind";

const tw = createTw({
  theme: {
    extend: {
      colors: {
        custom: "#bada55",
      },
    },
  },
});

export const InvoiceDocument: React.FC<{ data: InvoiceTypes }> = ({ data }) => {
  const subtotal =
    data.items?.reduce((sum, item) => sum + item.quantity * item.amount, 0) ||
    0;
  const taxAmount = (subtotal * (data.tax || 0)) / 100;
  const total = subtotal + taxAmount;

  return (
    <PDFDocument style={tw("bg-white")}>
      <Page size="A4" style={tw("p-10 text-[10px] bg-white")}>
        <View style={tw("flex-row justify-between mb-10")}>
          <View style={tw("flex-col")}>
            <Text style={tw("text-2xl font-bold text-orange-500 mb-2")}>
              {data.reciever.name}
            </Text>
            <Text style={tw("text-[9px] text-gray-500 leading-relaxed")}>
              {data.website}
            </Text>
            <Text style={tw("text-[9px] text-gray-500 leading-relaxed")}>
              {data.email || "hello@email.com"}
            </Text>
            <Text style={tw("text-[9px] text-gray-500 leading-relaxed")}>
              {data.sender.phoneNo || "+91 00000 00000"}
            </Text>
          </View>
          <View
            style={tw(
              "flex-col text-right text-[9px] text-gray-500 leading-relaxed",
            )}
          >
            <Text>{data.sender.street || "Business address"}</Text>
            <Text>{data.sender.city || "City, State, IN - 000 000"}</Text>
            <Text>{data.sender.pincode}</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={tw("bg-gray-50 p-8 rounded-lg")}>
          {/* Top Section */}
          <View style={tw("flex-row justify-between mb-8")}>
            <View style={tw("flex-1")}>
              <Text style={tw("text-[9px] text-gray-500 mb-1")}>Billed to</Text>
              <Text style={tw("text-[10px] text-gray-900 font-bold mb-0.5")}>
                {data.reciever.name}
              </Text>
              <Text style={tw("text-[9px] text-gray-500 leading-relaxed")}>
                {data.reciever.street || "Company address"}
              </Text>
              <Text style={tw("text-[9px] text-gray-500 leading-relaxed")}>
                {data.reciever.city || "City, Country - 00000"}
              </Text>
              <Text style={tw("text-[9px] text-gray-500 leading-relaxed")}>
                {data.reciever.phoneNo || "+0 (000) 123-4567"}
              </Text>
            </View>
            <View style={tw("flex-1 items-end")}>
              <Text style={tw("text-[9px] text-gray-500 mb-1")}>
                Invoice number
              </Text>
              <Text style={tw("text-sm font-bold text-gray-900 mb-2")}>
                {data.invoiceNumber || "#AB2324-01"}
              </Text>
              <Text style={tw("text-[9px] text-gray-500 mb-1")}>Reference</Text>
              <Text style={tw("text-[10px] text-gray-900 font-bold mb-0.5")}>
                {data.invoiceNumber || "INV-057"}
              </Text>
            </View>
          </View>

          <View style={tw("flex-row justify-between mb-8")}>
            <View style={tw("flex-1")}>
              <Text style={tw("text-[9px] text-gray-500 mb-1")}>Subject</Text>
              <Text style={tw("text-[10px] text-gray-900 font-bold mb-0.5")}>
                {data.subject}
              </Text>
            </View>
            <View style={tw("flex-1 items-end")}>
              <Text style={tw("text-[32px] text-orange-500 font-bold mb-5")}>
                ${total.toFixed(2)}
              </Text>
              <Text style={tw("text-[9px] text-gray-500 mb-1")}>
                Invoice date
              </Text>
              <Text style={tw("text-[10px] text-gray-900 font-bold mb-0.5")}>
                {`${data.invoiceDate.getDate().toString()}-${data.invoiceDate.getMonth().toString()}-${data.invoiceDate.getFullYear().toString()}`}
              </Text>
              <Text style={tw("text-[9px] text-gray-500 mb-1")}>Due date</Text>
              <Text style={tw("text-[10px] text-gray-900 font-bold mb-0.5")}>
                {`${data.dueDate.getDate().toString()}-${data.dueDate.getMonth().toString()}-${data.dueDate.getFullYear().toString()}`}
              </Text>
            </View>
          </View>

          {/* Table */}
          <View style={tw("mt-5")}>
            <View style={tw("flex-row border-b border-gray-200 pb-2 mb-3")}>
              <Text
                style={tw(
                  "flex-[3] text-[9px] text-gray-500 font-bold uppercase",
                )}
              >
                ITEM DETAIL
              </Text>
              <Text
                style={tw(
                  "flex-1 text-[9px] text-gray-500 font-bold uppercase text-center",
                )}
              >
                QTY
              </Text>
              <Text
                style={tw(
                  "flex-1 text-[9px] text-gray-500 font-bold uppercase text-right",
                )}
              >
                RATE
              </Text>
              <Text
                style={tw(
                  "flex-1 text-[9px] text-gray-500 font-bold uppercase text-right",
                )}
              >
                AMOUNT
              </Text>
            </View>

            {data.items?.map((item, index) => (
              <View
                key={index}
                style={tw("flex-row py-2 border-b border-gray-100")}
              >
                <View style={tw("flex-[3]")}>
                  <Text
                    style={tw("text-[10px] text-gray-900 font-bold mb-0.5")}
                  >
                    {item.name || "Item Name"}
                  </Text>
                  <Text style={tw("text-[9px] text-gray-500")}>
                    {item.desc || "Item description"}
                  </Text>
                </View>
                <Text
                  style={tw("flex-1 text-[10px] text-gray-900 text-center")}
                >
                  {item.quantity}
                </Text>
                <Text style={tw("flex-1 text-[10px] text-gray-900 text-right")}>
                  ${item.amount.toFixed(2)}
                </Text>
                <Text style={tw("flex-1 text-[10px] text-gray-900 text-right")}>
                  ${(item.quantity * item.amount).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>

          {/* Summary */}
          <View style={tw("mt-5 items-end")}>
            <View style={tw("flex-row justify-between w-[200px] py-1.5")}>
              <Text style={tw("text-[10px] text-gray-500")}>Subtotal</Text>
              <Text style={tw("text-[10px] text-gray-900 text-right")}>
                ₹{subtotal.toFixed(2)}
              </Text>
            </View>
            <View style={tw("flex-row justify-between w-[200px] py-1.5")}>
              <Text style={tw("text-[10px] text-gray-500")}>
                Tax ({data.tax || 10}%)
              </Text>
              <Text style={tw("text-[10px] text-gray-900 text-right")}>
                ${taxAmount.toFixed(2)}
              </Text>
            </View>
            <View
              style={tw(
                "flex-row justify-between w-[200px] py-2 border-t border-gray-200 mt-1",
              )}
            >
              <Text style={tw("text-[11px] text-gray-900 font-bold")}>
                Total
              </Text>
              <Text
                style={tw("text-[11px] text-gray-900 font-bold text-right")}
              >
                ₹{total.toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Footer */}
          <View style={tw("mt-16")}>
            <Text style={tw("text-[11px] text-gray-900 mb-10")}>
              Thanks for the business.
            </Text>
          </View>
        </View>

        {/* Terms */}
        <View style={tw("mt-5")}>
          <Text style={tw("text-[10px] text-gray-900 font-bold mb-1.5")}>
            Terms & Conditions
          </Text>
          <Text style={tw("text-[9px] text-gray-500")}>
            {data.message ||
              "Please pay within 15 days of receiving this invoice."}
          </Text>
        </View>
      </Page>
    </PDFDocument>
  );
};
