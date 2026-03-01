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
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      const element = targetRef.current;
      const width = Math.ceil(element.scrollWidth);
      const height = Math.ceil(element.scrollHeight);

      const canvas = await html2canvas(element, {
        scale: 4,
        useCORS: true,
        backgroundColor: "#ffffff",
        width,
        height,
        windowWidth: width,
        windowHeight: height,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);

      const safeName = student.Name.replace(/[^a-zA-Z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "")
        .slice(0, 60);

      pdf.save(`${safeName || "Student"}_Certificate.pdf`);
    } catch (err) {
      console.error(err);
      alert("PDF generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={disabled}
      className={`primary-button ${disabled ? "opacity-55" : ""}`}
      aria-busy={loading}
    >
      {loading ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4 animate-spin"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5a7.5 7.5 0 1 0 7.5 7.5"
            />
          </svg>
          Generating PDF...
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3.75v10.5m0 0 4.25-4.25M12 14.25l-4.25-4.25M4.5 15.75v1.125A2.625 2.625 0 0 0 7.125 19.5h9.75a2.625 2.625 0 0 0 2.625-2.625V15.75"
            />
          </svg>
          Download Selected PDF
        </>
      )}
    </button>
  );
}

export default DownloadButton;
