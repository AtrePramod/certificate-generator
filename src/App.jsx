import { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ExcelUpload from "./components/ExcelUpload";
import ManualStudentEntry from "./components/ManualStudentEntry";
import StudentTable from "./components/StudentTable";
import DownloadButton from "./components/DownloadButton";
import CertificatePreview from "./components/CertificatePreview";

const DEFAULT_COURSE_CONFIG = {
  subjectCode: "STM025105",
  course: "Design of Experiment Course (Major)",
  semester: "V",
  academicYear: "2025-26",
};

const DEFAULT_COLLEGE_CONFIG = {
  trustName: "Shikshana Prasaraka Mandali's",
  collegeName: "SIR PARASHURAMBHAU COLLEGE, PUNE-30",
  autonomyLine: "Empowered Autonomous",
  departmentName: "Department of Statistics",
  inchargeName: "Mr. Kamble S D",
  inchargeTitle: "Practical In-Charge",
  headName: "Ms. Tai Turkunde",
  headTitle: "Head, Department of Statistics",
  headStampLine1: "Head",
  headStampLine2: "Department of Statistics",
  headStampLine3: "S. P. College, Pune-30",
};

const DEFAULT_CONFIG = {
  ...DEFAULT_COURSE_CONFIG,
  ...DEFAULT_COLLEGE_CONFIG,
};

const COURSE_CONFIG_FIELDS = [
  { key: "subjectCode", label: "Subject Code", placeholder: "STM025105" },
  {
    key: "course",
    label: "Course Name",
    placeholder: "Design of Experiment Course (Major)",
  },
  { key: "semester", label: "Semester", placeholder: "V" },
  { key: "academicYear", label: "Academic Year", placeholder: "2025-26" },
];

const COLLEGE_CONFIG_FIELDS = [
  // {
  //   key: "trustName",
  //   label: "Trust / Mandali Name",
  //   placeholder: "Shikshana Prasaraka Mandali's",
  // },
  // {
  //   key: "collegeName",
  //   label: "College Name",
  //   placeholder: "SIR PARASHURAMBHAU COLLEGE, PUNE-30",
  // },
  // {
  //   key: "autonomyLine",
  //   label: "Autonomy Line",
  //   placeholder: "Empowered Autonomous",
  // },
  {
    key: "departmentName",
    label: "Department Name",
    placeholder: "Department of Statistics",
  },
  {
    key: "inchargeName",
    label: "Practical In-Charge Name",
    placeholder: "Mr. Kamble S D",
  },
  {
    key: "inchargeTitle",
    label: "Practical In-Charge Title",
    placeholder: "Practical In-Charge",
  },
  {
    key: "headName",
    label: "Head Name",
    placeholder: "Ms. Tai Turkunde",
  },
  {
    key: "headTitle",
    label: "Head Title",
    placeholder: "Head, Department of Statistics",
  },
  {
    key: "headStampLine1",
    label: "Head Stamp Line 1",
    placeholder: "Head",
  },
  {
    key: "headStampLine2",
    label: "Head Stamp Line 2",
    placeholder: "Department of Statistics",
  },
  {
    key: "headStampLine3",
    label: "Head Stamp Line 3",
    placeholder: "S. P. College, Pune-30",
  },
];

const CERTIFICATE_THEMES = [
  {
    id: "classic",
    title: "Classic",
    description: "Traditional academic certificate layout.",
  },
  {
    id: "modern",
    title: "Modern",
    description: "Editorial style with strong hierarchy.",
  },
  {
    id: "minimal",
    title: "Minimal",
    description: "Clean, understated formal style.",
  },
];

function App() {
  const [students, setStudents] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [certificateTheme, setCertificateTheme] = useState("classic");
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

  const handleResetCollegeDetails = () => {
    setConfig((prev) => ({ ...prev, ...DEFAULT_COLLEGE_CONFIG }));
  };

  const handleAddManualStudent = (student) => {
    const next = [...students, student];
    setStudents(next);
    setSelectedIndex(next.length - 1);
  };

  const handleBatchDownload = async () => {
    if (!students.length || !certificateRef.current) return;
    setBatchLoading(true);

    try {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      for (let i = 0; i < students.length; i += 1) {
        setSelectedIndex(i);
        await new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        );

        const element = certificateRef.current;
        const width = Math.ceil(element.scrollWidth);
        const height = Math.ceil(element.scrollHeight);

        const canvas = await html2canvas(element, {
          scale: 3,
          useCORS: true,
          backgroundColor: "#ffffff",
          width,
          height,
          windowWidth: width,
          windowHeight: height,
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
    <div className="min-h-screen px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-[1460px] app-fade-in">
        <header className="surface-card relative overflow-hidden p-5 sm:p-8">
          <div className="absolute -right-12 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,_rgba(186,118,52,0.28)_0%,_rgba(186,118,52,0)_68%)]" />
          <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-[radial-gradient(circle,_rgba(17,105,138,0.24)_0%,_rgba(17,105,138,0)_70%)]" />
          <div className="relative">
            <p className="eyebrow">Frontend-only workflow</p>
            <h1 className="font-display mt-2 text-4xl text-[var(--ink-900)] sm:text-5xl">
              Certificate Studio
            </h1>
            <p className="mt-3 max-w-3xl text-sm text-[var(--ink-500)] sm:text-base">
              Upload a validated Excel sheet, review each learner in real-time,
              and export clean, print-ready certificates as PDF files.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="stat-card">
                <div className="stat-label">Total Students</div>
                <div className="stat-value">{students.length}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Current Selection</div>
                <div className="stat-value truncate text-xl sm:text-2xl">
                  {selectedStudent?.Name || "No student selected"}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Template</div>
                <div className="stat-value text-xl sm:text-2xl capitalize">
                  {certificateTheme}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[390px_1fr]">
          <section className="space-y-5">
            <ExcelUpload onData={handleData} />
            <ManualStudentEntry onAddStudent={handleAddManualStudent} />

            <div className="surface-card p-5">
              <div className="section-title">Course Configuration</div>
              <p className="section-copy">
                These values are injected into every certificate while
                exporting.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {COURSE_CONFIG_FIELDS.map(({ key, label, placeholder }) => (
                  <label key={key} className="block">
                    <span className="field-label">{label}</span>
                    <input
                      value={config[key]}
                      placeholder={placeholder}
                      onChange={(event) =>
                        handleConfigChange(key, event.target.value)
                      }
                      className="input-modern"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="surface-card p-5">
              <div className="section-title">College Details</div>
              <p className="section-copy">
                Default institute details for certificate header and signatures.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {COLLEGE_CONFIG_FIELDS.map(({ key, label, placeholder }) => (
                  <label key={key} className="block">
                    <span className="field-label">{label}</span>
                    <input
                      value={config[key]}
                      placeholder={placeholder}
                      onChange={(event) =>
                        handleConfigChange(key, event.target.value)
                      }
                      className="input-modern"
                    />
                  </label>
                ))}
              </div>
              <button
                type="button"
                onClick={handleResetCollegeDetails}
                className="secondary-button mt-3"
              >
                Reset College Defaults
              </button>
            </div>

            <div className="surface-card p-5">
              <div className="section-title">Export Center</div>
              <p className="section-copy">
                Download the selected certificate or generate a complete batch
                PDF.
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                <DownloadButton
                  targetRef={certificateRef}
                  student={selectedStudent}
                />
                <button
                  type="button"
                  onClick={handleBatchDownload}
                  disabled={!students.length || batchLoading}
                  className={`secondary-button ${
                    !students.length || batchLoading
                      ? "cursor-not-allowed opacity-55"
                      : ""
                  }`}
                >
                  {batchLoading
                    ? "Generating batch PDF..."
                    : `Download All (${students.length})`}
                </button>
                {batchLoading ? (
                  <p className="text-xs text-[var(--ink-500)]">
                    Rendering certificate{" "}
                    {selectedIndex !== null ? selectedIndex + 1 : "..."} of{" "}
                    {students.length}. Please keep this tab active.
                  </p>
                ) : null}
              </div>
            </div>
          </section>

          <section className="xl:sticky xl:top-6">
            <div className="surface-card p-5 mb-5">
              <div className="section-title">Certificate Theme</div>
              <p className="section-copy">
                Select the design style used in preview and all PDF downloads.
              </p>
              <div className="mt-4 grid gap-2.5">
                {CERTIFICATE_THEMES.map((theme) => {
                  const isActive = certificateTheme === theme.id;

                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setCertificateTheme(theme.id)}
                      className={`theme-option ${isActive ? "theme-option-active" : ""}`}
                      aria-pressed={isActive}
                    >
                      <span className="theme-option-title">{theme.title}</span>
                      <span className="theme-option-desc">
                        {theme.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <CertificatePreview
              ref={certificateRef}
              student={selectedStudent}
              config={config}
              theme={certificateTheme}
            />
            <div className="mt-5" />
            <StudentTable
              students={students}
              selectedIndex={selectedIndex}
              onSelect={setSelectedIndex}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
