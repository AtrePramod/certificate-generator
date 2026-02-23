import { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ExcelUpload from "./components/ExcelUpload";
import StudentTable from "./components/StudentTable";
import DownloadButton from "./components/DownloadButton";
import CertificatePreview from "./components/CertificatePreview";

const DEFAULT_CONFIG = {
  subjectCode: "STM025105",
  course: "Design of Experiment Course (Major)",
  semester: "V",
  academicYear: "2025-26",
};

const CONFIG_FIELDS = [
  { key: "subjectCode", label: "Subject Code" },
  { key: "course", label: "Course Name" },
  { key: "semester", label: "Semester" },
  { key: "academicYear", label: "Academic Year" },
];

function App() {
  const [students, setStudents] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [batchLoading, setBatchLoading] = useState(false);

  const certificateRef = useRef(null);

  const selectedStudent = useMemo(() => {
    if (selectedIndex === null) return null;
    return students[selectedIndex] ?? null;
  }, [students, selectedIndex]);

  const handleData = (data) => {
    setStudents(data);
    setSelectedIndex(data.length ? 0 : null);
  };

  const handleConfigChange = (key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleBatchDownload = async () => {
    if (!students.length || !certificateRef.current) return;
    setBatchLoading(true);

    try {
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      for (let i = 0; i < students.length; i++) {
        setSelectedIndex(i);
        // Wait two animation frames so React re-renders the certificate before capture
        await new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        );

        const canvas = await html2canvas(certificateRef.current, {
          scale: 3,
          useCORS: true,
          backgroundColor: "#ffffff",
        });

        if (i > 0) pdf.addPage();
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297);
      }

      pdf.save("all_certificates.pdf");
    } catch (err) {
      console.error(err);
      alert("Batch download failed. Please try again.");
    } finally {
      setBatchLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8">

        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">
            Certificate Generator
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            S.P. College &mdash; Department of Statistics &nbsp;|&nbsp; Upload
            Excel &rarr; preview &rarr; download PDF
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* ── LEFT PANEL ── */}
          <div className="flex flex-col gap-4 lg:col-span-1">

            {/* 1. Excel Upload */}
            <ExcelUpload onData={handleData} />

            {/* 2. Course Configuration */}
            <div className="rounded-lg border bg-white p-4">
              <div className="mb-3 text-sm font-semibold text-slate-900">
                Course Configuration
              </div>
              <div className="flex flex-col gap-3">
                {CONFIG_FIELDS.map(({ key, label }) => (
                  <div key={key}>
                    <label className="mb-1 block text-xs font-medium text-slate-500">
                      {label}
                    </label>
                    <input
                      value={config[key]}
                      onChange={(e) => handleConfigChange(key, e.target.value)}
                      className="w-full rounded-md border px-3 py-1.5 text-sm outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Download */}
            <div className="rounded-lg border bg-white p-4">
              <div className="mb-3 text-sm font-semibold text-slate-900">
                Download
              </div>
              <div className="flex flex-col gap-2">
                <DownloadButton
                  targetRef={certificateRef}
                  student={selectedStudent}
                />
                <button
                  onClick={handleBatchDownload}
                  disabled={!students.length || batchLoading}
                  className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition ${
                    !students.length || batchLoading
                      ? "cursor-not-allowed bg-slate-100 text-slate-400"
                      : "bg-emerald-700 text-white hover:bg-emerald-600 active:bg-emerald-800"
                  }`}
                >
                  {batchLoading
                    ? "Generating PDFs…"
                    : `Download All (${students.length})`}
                </button>
                {batchLoading && (
                  <p className="text-xs text-slate-500">
                    Rendering certificate {selectedIndex != null ? selectedIndex + 1 : "…"}{" "}
                    of {students.length} — please wait…
                  </p>
                )}
              </div>
            </div>

            {/* 4. Student list */}
            <StudentTable
              students={students}
              selectedIndex={selectedIndex}
              onSelect={setSelectedIndex}
            />
          </div>

          {/* ── RIGHT PANEL — Certificate Preview ── */}
          <div className="lg:col-span-2">
            <CertificatePreview
              ref={certificateRef}
              student={selectedStudent}
              config={config}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
