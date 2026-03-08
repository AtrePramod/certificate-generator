import {
  getTextDensity,
  normalizeCollegeFields,
  normalizeCertificateFields,
} from "../utils/certificateText";

function ModernCertificate(props) {
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
        fontFamily: '"Segoe UI", "Trebuchet MS", Arial, sans-serif',
        color: "#11263a",
        background:
          "linear-gradient(160deg, #f5fbff 0%, #ffffff 38%, #fef9f2 100%)",
        padding: "48px 56px 44px 72px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          bottom: "0",
          width: "22px",
          background: "linear-gradient(180deg, #0f617f 0%, #0a4d65 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: "12px",
          border: "1px solid #c7dce7",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#47667d",
              fontWeight: "700",
            }}
          >
            {college.trustName}
          </div>
          <div
            style={{
              marginTop: "4px",
              fontSize: "25px",
              fontWeight: "700",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}
          >
            {college.collegeName}
          </div>
          <div style={{ marginTop: "4px", fontSize: "13px", color: "#47667d" }}>
            {[college.departmentName, college.autonomyLine]
              .filter(Boolean)
              .join(" | ")}
          </div>
        </div>
        <div
          style={{
            border: "1px solid #bbd4e2",
            background: "#ffffff",
            borderRadius: "999px",
            padding: "6px 12px",
            fontSize: "11px",
            letterSpacing: "0.11em",
            textTransform: "uppercase",
            color: "#0f617f",
            fontWeight: "700",
            maxWidth: "170px",
            wordBreak: "break-word",
          }}
        >
          Semester {fields.semester}
        </div>
      </div>

      <div style={{ marginTop: "42px" }}>
        <div
          style={{
            fontFamily: '"Georgia", "Times New Roman", serif',
            fontSize: "14px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#7d5a2d",
            fontWeight: "700",
          }}
        >
          Completion Certificate
        </div>
        <div
          style={{
            marginTop: "10px",
            height: "3px",
            width: "180px",
            background: "linear-gradient(90deg, #ba7634 0%, #e0c198 100%)",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: "72px",
          right: "56px",
          top: "258px",
          bottom: "224px",
          overflow: "hidden",
          fontSize: `${bodyFontSize}px`,
          lineHeight: bodyLineHeight,
          textAlign: "left",
          overflowWrap: "anywhere",
        }}
      >
        <p style={{ margin: 0 }}>This certifies that</p>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px 14px",
          }}
        >
          <div
            style={{
              borderRadius: "999px",
              padding: "5px 12px",
              border: "1px solid #d4e4ed",
              background: "#ffffff",
              fontSize: `${Math.max(bodyFontSize - 0.4, 12)}px`,
              maxWidth: "100%",
              wordBreak: "break-word",
            }}
          >
            Name: <strong>{fields.name}</strong>
          </div>
          <div
            style={{
              borderRadius: "999px",
              padding: "5px 12px",
              border: "1px solid #d4e4ed",
              background: "#ffffff",
              fontSize: `${Math.max(bodyFontSize - 0.4, 12)}px`,
              maxWidth: "100%",
              wordBreak: "break-word",
            }}
          >
            PRN: <strong>{fields.prn}</strong>
          </div>
        </div>

        <p style={{ marginTop: "14px", marginBottom: 0 }}>
          {"of the "}
          <strong>{fields.studentClass}</strong>
          {" class has successfully completed all practicals in "}
          <strong>{fields.subjectCode}</strong>
          {" - "}
          <strong>{fields.course}</strong>
          {", during Semester "}
          <strong>{fields.semester}</strong>
          {" of academic year "}
          <strong>{fields.academicYear}</strong>
          {
            ". This work has been examined and duly signed by the concerned teachers."
          }
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          left: "72px",
          right: "56px",
          bottom: "247px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
        }}
      >
        <div style={{ fontSize: "14px" }}>
          Date: <strong>{fields.issueDate}</strong>
        </div>
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#6d8496",
            maxWidth: "220px",
            textAlign: "right",
            wordBreak: "break-word",
          }}
        >
          Certificate ID: {fields.certificateId || "AUTO"}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: "72px",
          right: "56px",
          bottom: "140px",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          columnGap: "26px",
          alignItems: "end",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ height: `${headingGap}px` }} />
          <div
            style={{
              borderTop: "1px solid #2f4558",
              paddingTop: "7px",
              fontSize: "12.5px",
              overflowWrap: "anywhere",
            }}
          >
            {college.inchargeName}
            <br />
            {college.inchargeTitle}
          </div>
        </div>
        <div
          style={{
            width: "92px",
            height: "92px",
            borderRadius: "50%",
            border: "1.5px dashed #9fb8c7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontSize: "10px",
            color: "#6f8799",
          }}
        >
          College
          <br />
          Stamp
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: `${headingGap}px` }} />
          <div
            style={{
              borderTop: "1px solid #2f4558",
              paddingTop: "7px",
              fontSize: "12.5px",
              overflowWrap: "anywhere",
            }}
          >
            {college.headName}
            <br />
            {college.headTitle}
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: "136px",
          right: "136px",
          bottom: "56px",
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

export default ModernCertificate;
