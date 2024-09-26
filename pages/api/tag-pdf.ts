import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { PDFDocument, PDFName } from "pdf-lib";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    pdfPath: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { pdfPath } = req.body;

    // Load the existing PDF
    const existingPdfBytes = fs.readFileSync(path.resolve(pdfPath));
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Example: Set the document title and add structure elements
    pdfDoc.setTitle("Accessible PDF Document");
    const pages = pdfDoc.getPages();
    console.log(pages);
    const firstPage = pages[0];

    // Example: Adding a tag manually (detailed tagging requires more work)
    const structureTree = pdfDoc.context.obj({});
    pdfDoc.catalog.set(PDFName.of("StructTreeRoot"), structureTree);
    const kid = pdfDoc.context.obj({
      Type: "StructElem",
      S: "Document",
      P: structureTree,
      K: [
        {
          Type: "StructElem",
          S: "H1",
          P: structureTree,
          K: [
            {
              Type: "MCR",
              Pg: firstPage.ref,
              MCID: 0,
            },
          ],
        },
      ],
    });
    structureTree.set(PDFName.of("K"), kid);

    const pdfBytes = await pdfDoc.save();
    const outputPath = path.resolve("public/output-tagged.pdf");
    fs.writeFileSync(outputPath, pdfBytes);

    res
      .status(200)
      .json({ message: "PDF tagged successfully!", url: "/output-tagged.pdf" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
