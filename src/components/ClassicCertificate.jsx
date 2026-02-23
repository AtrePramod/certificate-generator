/**
 * ClassicCertificate — pixel-perfect replica of the S.P. College completion certificate.
 * All styles are inline so html2canvas captures them faithfully for PDF export.
 */
function ClassicCertificate({
  name = "STUDENT NAME",
  prn = "SPXXXXXXXX",
  subjectCode = "STM025105",
  course = "Design of Experiment Course (Major)",
  academicYear = "2025-26",
  semester = "V",
  issueDate = "DD/MM/YYYY",
  certificateId = "",
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        fontFamily: '"Times New Roman", Times, serif',
        color: "#000000",
        backgroundColor: "#ffffff",
        position: "relative",
        padding: "52px 64px 44px",
        boxSizing: "border-box",
        fontSize: "15px",
        lineHeight: "1.65",
      }}
    >
      {/* ── DASHED BORDER ── */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          right: "10px",
          bottom: "10px",
          border: "1.5px dashed #000000",
          pointerEvents: "none",
        }}
      />

      {/* ── HEADER ── */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontStyle: "italic",
            fontSize: "13px",
            marginBottom: "3px",
          }}
        >
          Shikshana Prasaraka Mandali&apos;s
        </div>

        <div
          style={{
            fontWeight: "700",
            fontSize: "22px",
            letterSpacing: "0.4px",
            marginBottom: "2px",
          }}
        >
          SIR PARASHURAMBHAU COLLEGE, PUNE-30.
        </div>

        <div style={{ fontSize: "14px", marginBottom: "20px" }}>
          (EMPOWERD AUTONOMOUS)
        </div>

        <div
          style={{
            fontWeight: "700",
            fontSize: "20px",
            letterSpacing: "0.5px",
            marginBottom: "20px",
          }}
        >
          DEPARTMENT OF STATISTICS
        </div>

        <div
          style={{
            fontWeight: "700",
            fontStyle: "italic",
            fontSize: "17px",
            textDecoration: "underline",
            fontFamily: '"Palatino Linotype", "Palatino", "Book Antiqua", serif',
            letterSpacing: "1.5px",
          }}
        >
          COMPLETION CERTIFICATE
        </div>
      </div>

      {/* ── BODY ── */}
      <div
        style={{
          marginTop: "36px",
          fontSize: "15px",
          lineHeight: "1.85",
          textAlign: "justify",
        }}
      >
        <p style={{ marginBottom: "8px", marginTop: 0 }}>
          This is to certify that,
        </p>

        {/* Name + PRN row */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            flexWrap: "wrap",
            gap: "6px 24px",
            paddingLeft: "52px",
            marginBottom: "2px",
          }}
        >
          <span>
            Mr./Ms{" "}
            <span
              style={{
                fontWeight: "700",
                textDecoration: "underline",
                textTransform: "uppercase",
              }}
            >
              {name}
            </span>
          </span>
          <span>
            PRN:{" "}
            <span
              style={{
                fontWeight: "700",
                textDecoration: "underline",
              }}
            >
              {prn}
            </span>
          </span>
        </div>

        {/* Main paragraph */}
        <p style={{ marginTop: "0" }}>
          of the T. Y. B. Sc. (NEP 1.0.) class has successfully completed all
          the practical&apos;s in{" "}
          <strong>
            {subjectCode}: Practical&apos;s in {course}
          </strong>{" "}
          during the <strong>Semester &ndash; {semester}</strong> for the
          academic year <strong>{academicYear}</strong> and that the same have
          been examined and duly signed by the concerned teachers.
        </p>
      </div>

      {/* ── DATE ── */}
      <div style={{ marginTop: "28px", fontSize: "15px" }}>
        Date: <strong>{issueDate}</strong>
      </div>

      {/* ── SIGNATURE SECTION ── */}
      <div
        style={{
          position: "absolute",
          bottom: "95px",
          left: "64px",
          right: "64px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        {/* Left – Practical In-Charge */}
        <div style={{ textAlign: "center", minWidth: "155px" }}>
          <div style={{ height: "54px" }} />
          <div
            style={{
              borderTop: "1px solid #000000",
              paddingTop: "6px",
              fontSize: "13px",
              lineHeight: "1.55",
            }}
          >
            <div>Mr. Kamble S D</div>
            <div>Practical In-Charge</div>
          </div>
        </div>

        {/* Centre – College Stamp */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "88px",
              height: "88px",
              border: "1px dashed #888888",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              textAlign: "center",
              color: "#999999",
            }}
          >
            College
            <br />
            Stamp
          </div>
        </div>

        {/* Right – Head of Department */}
        <div style={{ textAlign: "center", minWidth: "185px" }}>
          <div style={{ height: "54px" }} />
          <div
            style={{
              borderTop: "1px solid #000000",
              paddingTop: "6px",
              fontSize: "13px",
              lineHeight: "1.55",
            }}
          >
            <div>Ms. Tai Turkunde</div>
            <div>Head,</div>
            <div>Department of Statistics</div>
            <div>S. P. College, Pune</div>
          </div>
          {/* Printed stamp block */}
          <div
            style={{
              marginTop: "10px",
              fontSize: "12px",
              fontWeight: "700",
              lineHeight: "1.5",
            }}
          >
            <div>Head</div>
            <div style={{ fontStyle: "italic" }}>Department of Statistics</div>
            <div style={{ fontStyle: "italic" }}>S. P. College, Pune-30.</div>
          </div>
        </div>
      </div>

      {/* ── EXAMINER ROW ── */}
      <div
        style={{
          position: "absolute",
          bottom: "38px",
          left: "64px",
          right: "64px",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "14px",
        }}
      >
        <div>Internal Examiner</div>
        <div>External Examiner</div>
      </div>

      {/* ── CERTIFICATE ID (subtle) ── */}
      {certificateId && (
        <div
          style={{
            position: "absolute",
            bottom: "14px",
            right: "64px",
            fontSize: "9px",
            color: "#bbbbbb",
          }}
        >
          ID: {certificateId}
        </div>
      )}
    </div>
  );
}

export default ClassicCertificate;
