// pages/api/process-pdf.ts
import { NextApiRequest, NextApiResponse } from "next";
import { makePdfAccessible } from "../../utils/pdfUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const pdfBytes = Buffer.from(req.body.pdf, "base64");
      const accessiblePdfBytes = await makePdfAccessible(pdfBytes);

      res.status(200).json({ pdf: accessiblePdfBytes.toString() });
    } catch (error) {
      res.status(500).json({ error: "Failed to process PDF" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
