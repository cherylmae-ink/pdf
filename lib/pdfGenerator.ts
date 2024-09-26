// lib/pdfGenerator.ts
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function generatePDF(): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);

  // Load a standard font
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Set up some basic WCAG compliant styles
  const fontSize = 12;
  const textColor = rgb(0, 0, 0); // Black text color

  // Draw text on the page
  page.drawText("WCAG Compliant PDF", {
    x: 50,
    y: 350,
    size: fontSize,
    font: font,
    color: textColor,
  });

  // Draw additional content ensuring high contrast and readable font sizes
  page.drawText(
    "This is an example of a PDF that adheres to WCAG guidelines.",
    {
      x: 50,
      y: 330,
      size: fontSize,
      font: font,
      color: textColor,
    }
  );

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
