"use client"


import { PDFViewer } from "@/components/pdf-viewer";
import React from "react";
export const InvoicePDF: React.FC<{ pdfUrl: string | null  }> = ({ pdfUrl }) => {
React.useEffect(()=>{
  console.log("use in here")
})
  return (
    <div className="h-[700px] w-full overflow-y-auto bg-gray-100">
      <PDFViewer url={pdfUrl} width={600} />
    </div>
  );
};