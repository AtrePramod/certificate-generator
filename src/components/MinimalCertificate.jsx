import {
  getTextDensity,
  normalizeCollegeFields,
  normalizeCertificateFields,
} from "../utils/certificateText";

function MinimalCertificate(props) {
  const fields = normalizeCertificateFields(props);
  const college = normalizeCollegeFields(props);
  const { bodyFontSize, bodyLineHeight, headingGap } = getTextDensity(fields);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        boxSizing: "border-box",
        fontFamily: '"Georgia", "Times New Roman", serif',
        color: "#1f1f1f",
        background: "#ffffff",
        padding: "58px 66px 48px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "16px",
          border: "1.4px solid #222222",
          pointerEvents: "none",
        }}
      />

      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: "12px",
            letterSpacing: "0.17em",
            textTransform: "uppercase",
            color: "#555555",
          }}
        >
          {college.trustName}
        </div>
        <div
          style={{
            marginTop: "7px",
            fontSize: "22px",
            letterSpacing: "0.02em",
            fontWeight: "700",
            textTransform: "uppercase",
          }}
        >
          {college.collegeName}
        </div>
        <div style={{ marginTop: "4px", fontSize: "13px", color: "#555555" }}>
          {[college.departmentName, college.autonomyLine]
            .filter(Boolean)
            .join(" | ")}
        </div>
        <div
          style={{
            margin: "18px auto 0",
            width: "100px",
            borderTop: "1px solid #777777",
          }}
        />
        <div
          style={{
            marginTop: "13px",
            fontSize: "26px",
            fontWeight: "700",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Certificate
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: "66px",
          right: "66px",
          top: "250px",
          bottom: "226px",
          overflow: "hidden",
          fontSize: `${bodyFontSize}px`,
          lineHeight: bodyLineHeight,
          textAlign: "left",
          overflowWrap: "anywhere",
        }}
      >
        {"This is to certify that "}
        <strong>{fields.name}</strong>
        {" (PRN "}
        <strong>{fields.prn}</strong>
        {") of "}
        <strong>{fields.studentClass}</strong>
        {" has satisfactorily completed all practical work in "}
        <strong>{fields.subjectCode}</strong>
        {": "}
        <strong>{fields.course}</strong>
        {", during Semester "}
        <strong>{fields.semester}</strong>
        {" for academic year "}
        <strong>{fields.academicYear}</strong>
        {
          ". The same has been examined and signed by the concerned teachers of the department."
        }
      </div>

      <div
        style={{
          position: "absolute",
          left: "66px",
          right: "66px",
          bottom: "246px",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "14px",
          gap: "10px",
        }}
      >
        <div>
          Date: <strong>{fields.issueDate}</strong>
        </div>
        <div style={{ color: "#666666", textAlign: "right", maxWidth: "45%" }}>
          ID: {fields.certificateId || "AUTO"}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: "66px",
          right: "66px",
          bottom: "146px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
        }}
      >
        <div style={{ textAlign: "center", minWidth: "180px" }}>
          <div style={{ height: `${headingGap}px` }} />
          <div
            style={{
              borderTop: "1px solid #2f2f2f",
              paddingTop: "7px",
              fontSize: "12.5px",
              overflowWrap: "anywhere",
            }}
          >
            <div>{college.inchargeName}</div>
            <div>{college.inchargeTitle}</div>
          </div>
        </div>
        <div
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            border: "1px dashed #8b8b8b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontSize: "10px",
            color: "#666666",
          }}
        >
          College
          <br />
          Stamp
        </div>
        <div style={{ textAlign: "center", minWidth: "180px" }}>
          <div style={{ height: `${headingGap}px` }} />
          <div
            style={{
              borderTop: "1px solid #2f2f2f",
              paddingTop: "7px",
              fontSize: "12.5px",
              overflowWrap: "anywhere",
            }}
          >
            <div>{college.headName}</div>
            <div>{college.headTitle}</div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: "94px",
          right: "94px",
          bottom: "58px",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "13px",
        }}
      >
        <div>Internal Examiner</div>
        <div>External Examiner</div>
      </div>
    </div>
  );
}

export default MinimalCertificate;
