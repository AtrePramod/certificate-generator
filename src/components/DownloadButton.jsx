import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function DownloadButton({ targetRef, student }) {
  const [loading, setLoading] = useState(false);

  const disabled = !student || !targetRef?.current || loading;

  const handleDownload = async () => {
    if (disabled) return;

    setLoading(true);

    try {
      const element = targetRef.current;

      const canvas = await html2canvas(element, {
        scale: 4,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);

      const safeName = student.Name.replace(/[^a-zA-Z0-9]/g, "_");

      pdf.save(`${safeName}_Certificate.pdf`);
    } catch (err) {
      console.error(err);
      alert("PDF generation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition ${
        disabled
          ? "cursor-not-allowed bg-slate-200 text-slate-500"
          : "bg-slate-900 text-white hover:bg-slate-800"
      }`}
    >
      {loading ? "Generating PDF..." : "Download Certificate PDF"}
    </button>
  );
}

export default DownloadButton;
