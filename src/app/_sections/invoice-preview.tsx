"use client";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  render,
  PDFViewer,
  PDFRenderer,
} from "@react-pdf/renderer";
import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { InvoiceTypes } from "@/lib/types";
import { invoiceSchema } from "@/lib/schema";
import { useDebouncedCallback } from "use-debounce";

interface InvoicePreviewProps {
  form: UseFormReturn<InvoiceTypes>;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  logo: {
    width: 50,
    height: 50,
  },
  companyInfo: {
    flexDirection: "column",
  },
  companyName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F97316",
    marginBottom: 8,
  },
  companyDetails: {
    fontSize: 9,
    color: "#6B7280",
    lineHeight: 1.5,
  },
  businessAddress: {
    textAlign: "right",
    fontSize: 9,
    color: "#6B7280",
    lineHeight: 1.5,
  },
  mainContent: {
    backgroundColor: "#F9FAFB",
    padding: 30,
    borderRadius: 8,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  billedTo: {
    flex: 1,
  },
  invoiceInfo: {
    flex: 1,
    alignItems: "flex-end",
  },
  label: {
    fontSize: 9,
    color: "#6B7280",
    marginBottom: 4,
  },
  value: {
    fontSize: 10,
    color: "#111827",
    fontWeight: "bold",
    marginBottom: 2,
  },
  invoiceNumber: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "bold",
    marginBottom: 8,
  },
  invoiceAmount: {
    fontSize: 32,
    color: "#F97316",
    fontWeight: "bold",
    marginBottom: 20,
  },
  middleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 8,
    marginBottom: 12,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  itemDetailCol: {
    flex: 3,
  },
  qtyCol: {
    flex: 1,
    textAlign: "center",
  },
  rateCol: {
    flex: 1,
    textAlign: "right",
  },
  amountCol: {
    flex: 1,
    textAlign: "right",
  },
  tableHeaderText: {
    fontSize: 9,
    color: "#6B7280",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  itemName: {
    fontSize: 10,
    color: "#111827",
    fontWeight: "bold",
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 9,
    color: "#6B7280",
  },
  tableCellText: {
    fontSize: 10,
    color: "#111827",
  },
  summarySection: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    paddingVertical: 6,
  },
  summaryLabel: {
    fontSize: 10,
    color: "#6B7280",
  },
  summaryValue: {
    fontSize: 10,
    color: "#111827",
    textAlign: "right",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 11,
    color: "#111827",
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 11,
    color: "#111827",
    fontWeight: "bold",
    textAlign: "right",
  },
  footer: {
    marginTop: 60,
  },
  thanksText: {
    fontSize: 11,
    color: "#111827",
    marginBottom: 40,
  },
  termsSection: {
    marginTop: 20,
  },
  termsTitle: {
    fontSize: 10,
    color: "#111827",
    fontWeight: "bold",
    marginBottom: 6,
  },
  termsText: {
    fontSize: 9,
    color: "#6B7280",
  },
});

const InvoicePDF: React.FC<{ data: InvoiceTypes }> = ({ data }) => {
  const subtotal =
    data.items?.reduce((sum, item) => sum + item.quantity * item.amount, 0) ||
    0;
  const taxAmount = (subtotal * (data.tax || 0)) / 100;
  const total = subtotal + taxAmount;

  return (
    <PDFViewer showToolbar={false} height={700} width={500}>
      <Document
        style={{
          backgroundColor: "white",
        }}
      >
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>{data.componyName}</Text>
              <Text style={styles.companyDetails}>{data.website}</Text>
              <Text style={styles.companyDetails}>
                {data.email || "hello@email.com"}
              </Text>
              <Text style={styles.companyDetails}>
                {data.sender.phoneNo || "+91 00000 00000"}
              </Text>
            </View>
            <View style={styles.businessAddress}>
              <Text>{data.sender.street || "Business address"}</Text>
              <Text>{data.sender.city || "City, State, IN - 000 000"}</Text>
              <Text>{data.sender.pincode} </Text>
            </View>
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            {/* Top Section */}
            <View style={styles.topSection}>
              <View style={styles.billedTo}>
                <Text style={styles.label}>Billed to</Text>
                <Text style={styles.value}>{data.reciever.name}</Text>
                <Text style={styles.companyDetails}>
                  {data.reciever.street || "Company address"}
                </Text>
                <Text style={styles.companyDetails}>
                  {data.reciever.city || "City, Country - 00000"}
                </Text>
                <Text style={styles.companyDetails}>
                  {data.reciever.phoneNo || "+0 (000) 123-4567"}
                </Text>
              </View>
              <View style={styles.invoiceInfo}>
                <Text style={styles.label}>Invoice number</Text>
                <Text style={styles.invoiceNumber}>
                  {data.invoiceNumber || "#AB2324-01"}
                </Text>
                <Text style={styles.label}>Reference</Text>
                <Text style={styles.value}>
                  {data.invoiceNumber || "INV-057"}
                </Text>
              </View>
            </View>

            <View style={styles.topSection}>
              <View style={styles.billedTo}>
                <Text style={styles.label}>Subject</Text>
                <Text style={styles.value}>{data.subject}</Text>
              </View>
              <View style={styles.invoiceInfo}>
                <Text style={styles.invoiceAmount}>${total.toFixed(2)}</Text>
                <Text style={styles.label}>Invoice date</Text>
                <Text
                  style={styles.value}
                >{`${data.invoiceDate.getDate().toString()}-${data.invoiceDate.getMonth().toString()}-${data.invoiceDate.getFullYear().toString()}`}</Text>
                <Text style={styles.label}>Due date</Text>
                <Text style={styles.value}>{"15 Aug, 2023"}</Text>
              </View>
            </View>

            {/* Table */}
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, styles.itemDetailCol]}>
                  ITEM DETAIL
                </Text>
                <Text style={[styles.tableHeaderText, styles.qtyCol]}>QTY</Text>
                <Text style={[styles.tableHeaderText, styles.rateCol]}>
                  RATE
                </Text>
                <Text style={[styles.tableHeaderText, styles.amountCol]}>
                  AMOUNT
                </Text>
              </View>

              {data.items?.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <View style={styles.itemDetailCol}>
                    <Text style={styles.itemName}>
                      {item.name || "Item Name"}
                    </Text>
                    <Text style={styles.itemDescription}>
                      {item.desc || "Item description"}
                    </Text>
                  </View>
                  <Text style={[styles.tableCellText, styles.qtyCol]}>
                    {item.quantity}
                  </Text>
                  <Text style={[styles.tableCellText, styles.rateCol]}>
                    ${item.amount.toFixed(2)}
                  </Text>
                  <Text style={[styles.tableCellText, styles.amountCol]}>
                    ${(item.quantity * item.amount).toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>

            {/* Summary */}
            <View style={styles.summarySection}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tax ({data.tax || 10}%)</Text>
                <Text style={styles.summaryValue}>${taxAmount.toFixed(2)}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.thanksText}>Thanks for the business.</Text>
            </View>
          </View>

          {/* Terms */}
          <View style={styles.termsSection}>
            <Text style={styles.termsTitle}>Terms & Conditions</Text>
            <Text style={styles.termsText}>
              {data.message ||
                "Please pay within 15 days of receiving this invoice."}
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ form }) => {
  const [data, setData] = React.useState(form.getValues());

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setData(value);
    },
    // delay in ms
    1000,
  );

  React.useEffect(() => {
    const subscription = form.watch((value) => {
      console.log("website", value.website);

      const isParsed = invoiceSchema.safeParse(value);
      console.log("website error", isParsed.error?.message);
      console.log("website parsed data", isParsed.data?.website);
      if (isParsed.success) {
        debounced(value as InvoiceTypes);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return <InvoicePDF data={data}></InvoicePDF>;
};

export default InvoicePreview;
