"use client";

import { useState } from "react";
import { Document, pdfjs, Page as ReactPDFPage } from "react-pdf";



export const PDFViewer = ({
  url,
  width,
}: {
  url: string | null;
  width: number;
}) => {
  const [error, setError] = useState<Error | null>(null);

  if (width === 0) {
    width = 600;
  }

  if (!url) {
    return null;
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Document
        file={url}
        loading={null}
        onLoadError={(error) => {
          console.error("[ERROR]: Error loading PDF:", error);
          setError(error);
        }}
        className="flex h-full max-h-full w-full items-center justify-center overflow-y-scroll py-[18px] sm:items-start"
      >
        {!error && (
          <ReactPDFPage
            pageNumber={1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        )}
      </Document>
    </div>
  );
};
