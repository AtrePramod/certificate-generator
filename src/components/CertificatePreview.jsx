import { forwardRef, useEffect, useRef, useState } from "react";
import ClassicCertificate from "./ClassicCertificate";
import ModernCertificate from "./ModernCertificate";
import MinimalCertificate from "./MinimalCertificate";

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const MM_TO_PX = 3.7795275591;

const TEMPLATE_MAP = {
  classic: ClassicCertificate,
  modern: ModernCertificate,
  minimal: MinimalCertificate,
};

const CertificatePreview = forwardRef(function CertificatePreview(
  { student, config, theme = "classic" },
  ref,
) {
  const viewportRef = useRef(null);
  const [scale, setScale] = useState(0.72);
  const Template = TEMPLATE_MAP[theme] || ClassicCertificate;

  useEffect(() => {
    if (!viewportRef.current || typeof ResizeObserver === "undefined") {
      return undefined;
    }

    const node = viewportRef.current;
    const observer = new ResizeObserver(([entry]) => {
      const containerWidth = entry?.contentRect?.width ?? 0;
      if (!containerWidth) return;

      const availableWidth = Math.max(containerWidth - 40, 1);
      const nextScale = availableWidth / (A4_WIDTH_MM * MM_TO_PX);
      const clamped = Math.max(0.35, Math.min(0.86, nextScale));

      setScale((prev) => (Math.abs(prev - clamped) > 0.01 ? clamped : prev));
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="surface-card flex h-full max-h-full flex-col p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl leading-none text-[var(--ink-900)]">
              Certificate Preview
            </h2>
            <p className="mt-1 text-xs text-[var(--ink-500)]">
              Live A4 preview with exact export dimensions.
            </p>
          </div>
          <div className="rounded-xl border border-[rgba(17,105,138,0.2)] bg-[var(--brand-soft)] px-3 py-2 text-right">
            <div className="text-[10px] font-semibold uppercase tracking-[0.11em] text-[var(--brand)]">
              {theme} template
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.11em] text-[var(--ink-500)]">
              Active Student
            </div>
            <div className="max-w-[220px] truncate text-sm font-semibold text-[var(--brand-strong)]">
              {student?.Name || "Sample Preview"}
            </div>
          </div>
        </div>

        <div
          ref={viewportRef}
          className="relative flex-1 overflow-auto rounded-3xl border border-[rgba(16,35,56,0.12)] bg-[linear-gradient(145deg,_rgba(246,250,253,0.9)_0%,_rgba(248,244,237,0.85)_100%)] p-3 sm:p-5"
        >
          <div
            className="mx-auto flex w-fit justify-center"
            style={{
              marginBottom: `calc(${A4_HEIGHT_MM}mm * ${scale - 1})`,
            }}
          >
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top center",
              }}
            >
              <div
                style={{
                  width: `${A4_WIDTH_MM}mm`,
                  height: `${A4_HEIGHT_MM}mm`,
                  backgroundColor: "#ffffff",
                  position: "relative",
                  boxShadow: "0 30px 70px -40px rgba(0,0,0,0.6)",
                }}
              >
                <Template
                  name={student?.Name}
                  prn={student?.PRN}
                  issueDate={student?.Issue_Date}
                  certificateId={student?.Certificate_ID}
                  subjectCode={config?.subjectCode}
                  course={config?.course}
                  semester={config?.semester}
                  academicYear={config?.academicYear}
                  trustName={config?.trustName}
                  collegeName={config?.collegeName}
                  autonomyLine={config?.autonomyLine}
                  departmentName={config?.departmentName}
                  inchargeName={config?.inchargeName}
                  inchargeTitle={config?.inchargeTitle}
                  headName={config?.headName}
                  headTitle={config?.headTitle}
                  headStampLine1={config?.headStampLine1}
                  headStampLine2={config?.headStampLine2}
                  headStampLine3={config?.headStampLine3}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dedicated unscaled export canvas source for exact PDF alignment */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: "-100000px",
          top: "0",
          width: `${A4_WIDTH_MM}mm`,
          height: `${A4_HEIGHT_MM}mm`,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: -1,
        }}
      >
        <div
          ref={ref}
          style={{
            width: `${A4_WIDTH_MM}mm`,
            height: `${A4_HEIGHT_MM}mm`,
            backgroundColor: "#ffffff",
            position: "relative",
          }}
        >
          <Template
            name={student?.Name}
            prn={student?.PRN}
            issueDate={student?.Issue_Date}
            certificateId={student?.Certificate_ID}
            subjectCode={config?.subjectCode}
            course={config?.course}
            semester={config?.semester}
            academicYear={config?.academicYear}
            trustName={config?.trustName}
            collegeName={config?.collegeName}
            autonomyLine={config?.autonomyLine}
            departmentName={config?.departmentName}
            inchargeName={config?.inchargeName}
            inchargeTitle={config?.inchargeTitle}
            headName={config?.headName}
            headTitle={config?.headTitle}
            headStampLine1={config?.headStampLine1}
            headStampLine2={config?.headStampLine2}
            headStampLine3={config?.headStampLine3}
          />
        </div>
      </div>
    </>
  );
});

export default CertificatePreview;
