import { forwardRef } from "react";
import ClassicCertificate from "./ClassicCertificate";

/**
 * Renders ClassicCertificate inside a scaled preview wrapper.
 * The ref points to the actual A4-sized div (210mm × 297mm) used for PDF capture.
 */
const CertificatePreview = forwardRef(function CertificatePreview(
  { student, config },
  ref,
) {
  const SCALE = 0.72;

  return (
    <div className="rounded-xl border bg-slate-200 p-4">
      {/* Outer container collapses to the visual (scaled) height */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          /* Push up by the space that the CSS box still occupies after scaling */
          marginBottom: `calc(297mm * ${SCALE - 1})`,
        }}
      >
        <div
          style={{
            transform: `scale(${SCALE})`,
            transformOrigin: "top center",
          }}
        >
          {/* This div is what html2canvas captures — keep it exactly A4 */}
          <div
            ref={ref}
            style={{
              width: "210mm",
              height: "297mm",
              backgroundColor: "#ffffff",
              position: "relative",
              boxShadow: "0 4px 32px rgba(0,0,0,0.18)",
            }}
          >
            <ClassicCertificate
              name={student?.Name}
              prn={student?.PRN}
              issueDate={student?.Issue_Date}
              certificateId={student?.Certificate_ID}
              subjectCode={config?.subjectCode}
              course={config?.course}
              semester={config?.semester}
              academicYear={config?.academicYear}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default CertificatePreview;
