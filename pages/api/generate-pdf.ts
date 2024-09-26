// pages/api/generate-pdf.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { generatePDF } from "../../lib/pdfGenerator";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const pdfBytes = await generatePDF();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=wcag-compliant.pdf"
    );
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
};

export default handler;
