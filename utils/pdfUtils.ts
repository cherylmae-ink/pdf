// utils/pdfUtils.ts
import { PDFDocument, rgb } from "pdf-lib";

export async function makePdfAccessible(
  pdfBytes: Uint8Array
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes);

  // Example of adding metadata for accessibility
  pdfDoc.setTitle("Accessible PDF");
  pdfDoc.setAuthor("Your Name");
  pdfDoc.setSubject("PDF Accessibility");
  pdfDoc.setKeywords(["WCAG", "Accessibility", "PDF"]);
  pdfDoc.setProducer("pdf-lib");
  pdfDoc.setCreationDate(new Date());

  // Example of adding alt text to an image (assuming the first page contains an image)
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  firstPage.drawText("Alt text for image", {
    x: 50,
    y: 700,
    size: 12,
    color: rgb(0, 0, 0),
  });

  // Save the modified PDF
  const pdfBytesModified = await pdfDoc.save();
  return pdfBytesModified;
}
