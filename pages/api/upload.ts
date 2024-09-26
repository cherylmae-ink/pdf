import formidable, { File } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

interface FormidableFile extends File {
  filepath: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = formidable({
    uploadDir: path.resolve("./public/uploads"),
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({ message: "File upload error" });
      return;
    }

    const pdfPath = (files.pdf as unknown as FormidableFile).filepath;

    res.status(200).json({ pdfPath });
  });
}
