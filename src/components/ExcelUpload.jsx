import { useRef, useState } from "react";
import { parseExcelFile } from "../utils/parseExcel";

function ExcelUpload({ onData }) {
  const inputRef = useRef(null);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const resetUpload = () => {
    setCount(0);
    setFileName("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleFile = async (file) => {
    setError("");
    setCount(0);

    if (!file) {
      return;
    }

    const isXlsx =
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.name.toLowerCase().endsWith(".xlsx");

    if (!isXlsx) {
      setError("Invalid format. Please upload an .xlsx file only.");
      onData([]);
      resetUpload();
      return;
    }

    try {
      const students = await parseExcelFile(file);
      setFileName(file.name);
      setCount(students.length);
      onData(students);
    } catch (err) {
      setError(err?.message || "Failed to parse Excel file.");
      onData([]);
      resetUpload();
    }
  };

  const handleChange = async (event) => {
    const file = event.target.files?.[0];
    await handleFile(file);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    await handleFile(file);
  };

  return (
    <div className="surface-card p-5">
      <div className="section-title">Data Import</div>
      <p className="section-copy">
        Upload the source Excel sheet with student rows to generate
        certificates.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept=".xlsx"
        onChange={handleChange}
        className="hidden"
      />

      <div
        role="button"
        tabIndex={0}
        onDrop={handleDrop}
        onDragEnter={() => setIsDragging(true)}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        className={`mt-4 rounded-2xl border border-dashed p-5 text-center transition ${
          isDragging
            ? "border-[var(--brand)] bg-[var(--brand-soft)]"
            : "border-[rgba(16,35,56,0.18)] bg-white/70 hover:border-[rgba(17,105,138,0.42)] hover:bg-white"
        }`}
      >
        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--brand-soft)] text-[var(--brand)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16V6m0 0 3.5 3.5M12 6 8.5 9.5M5 16.5v.75A1.75 1.75 0 0 0 6.75 19h10.5A1.75 1.75 0 0 0 19 17.25v-.75"
            />
          </svg>
        </div>
        <p className="text-sm font-semibold text-[var(--ink-900)]">
          Drop .xlsx file here or click to browse
        </p>
        <p className="mt-1 text-xs text-[var(--ink-500)]">
          Supports one sheet and validates required columns automatically.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="chip">Name</span>
        <span className="chip">PRN</span>
        <span className="chip">Class</span>
        <span className="chip">Certificate_ID</span>
        <span className="chip">Issue_Date</span>
      </div>

      {fileName ? (
        <div className="mt-3 rounded-xl border border-[rgba(13,131,103,0.24)] bg-[rgba(13,131,103,0.08)] px-3 py-2 text-sm text-[var(--ok)]">
          Loaded: <span className="font-semibold">{fileName}</span>
        </div>
      ) : null}

      {count > 0 ? (
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--ok)]">
          Ready: {count} records imported
        </p>
      ) : null}

      {error ? (
        <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}
    </div>
  );
}

export default ExcelUpload;
