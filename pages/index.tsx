// pages/index.tsx
import * as React from "react";

const HomePage: React.FC = () => {
  const downloadPDF = async () => {
    const response = await fetch("/api/generate-pdf");
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wcag-compliant.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div>
      <h1>Generate WCAG Compliant PDF</h1>
      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  );
};

export default HomePage;
