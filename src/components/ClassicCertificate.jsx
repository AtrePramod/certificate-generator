import {
  getTextDensity,
  normalizeCollegeFields,
  normalizeCertificateFields,
} from "../utils/certificateText";

function ClassicCertificate(props) {
  const fields = normalizeCertificateFields(props);
  const college = normalizeCollegeFields(props);
  const { bodyFontSize, bodyLineHeight, headingGap } = getTextDensity(fields);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        fontFamily: '"Times New Roman", Times, serif',
        color: "#1e1b16",
        background:
          "linear-gradient(180deg, #fffdf9 0%, #ffffff 18%, #fffdfa 100%)",
        position: "relative",
        padding: "56px 66px 46px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "9px",
          left: "9px",
          right: "9px",
          bottom: "9px",
          border: "1.5px solid #b08346",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "17px",
          left: "17px",
          right: "17px",
          bottom: "17px",
          border: "1.25px dashed #d4b27f",
          pointerEvents: "none",
        }}
      />

      <div style={{ textAlign: "center" }}>
        <div
          style={{ fontStyle: "italic", fontSize: "13px", marginBottom: "3px" }}
        >
          {college.trustName}
        </div>

        <div
          style={{
            fontWeight: "700",
            fontSize: "22px",
            letterSpacing: "0.35px",
            marginBottom: "2px",
            textTransform: "uppercase",
          }}
        >
          {college.collegeName}
        </div>

        {college.autonomyLine ? (
          <div style={{ fontSize: "13.5px", marginBottom: "18px" }}>
            ({college.autonomyLine})
          </div>
        ) : null}

        <div
          style={{
            fontWeight: "700",
            fontSize: "20px",
            letterSpacing: "0.5px",
            marginBottom: "18px",
            textTransform: "uppercase",
          }}
        >
          {college.departmentName}
        </div>

        <div
          style={{
            margin: "0 auto 0",
            width: "240px",
            borderTop: "1px solid #d6bc95",
          }}
        />

        <div
          style={{
            marginTop: "14px",
            fontWeight: "700",
            fontStyle: "italic",
            fontSize: "17px",
            textDecoration: "underline",
            textDecorationColor: "#b08346",
            fontFamily:
              '"Palatino Linotype", "Palatino", "Book Antiqua", serif',
            letterSpacing: "1.35px",
          }}
        >
          COMPLETION CERTIFICATE
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: "66px",
          right: "66px",
          top: "236px",
          bottom: "236px",
          overflow: "hidden",
          fontSize: `${bodyFontSize}px`,
          lineHeight: bodyLineHeight,
          textAlign: "left",
          wordBreak: "normal",
          overflowWrap: "anywhere",
        }}
      >
        <p style={{ margin: 0, marginBottom: "8px" }}>
          This is to certify that
        </p>

        <p
          style={{
            marginTop: 0,
            marginBottom: "2px",
            paddingLeft: "28px",
            maxWidth: "100%",
            wordBreak: "break-word",
          }}
        >
          {"Mr./Ms. "}
          <span
            style={{
              fontWeight: "700",
              textDecoration: "underline",
              textDecorationColor: "#b08346",
              textTransform: "uppercase",
              wordBreak: "break-word",
            }}
          >
            {fields.name}
          </span>
        </p>

        <p style={{ marginTop: 0, marginBottom: "6px", paddingLeft: "28px" }}>
          {"PRN: "}
          <span
            style={{
              fontWeight: "700",
              textDecoration: "underline",
              textDecorationColor: "#b08346",
              wordBreak: "break-word",
            }}
          >
            {fields.prn}
          </span>
        </p>

        <p style={{ marginTop: 0, marginBottom: 0 }}>
          {"of the "}
          <strong>{fields.studentClass}</strong>
          {" class has successfully completed all practicals in "}{" "}
          <strong>{fields.subjectCode}</strong>
          {" : Practicals in "}
          <strong>{fields.course}</strong>
          {" during Semester "}
          <strong>{fields.semester}</strong>
          {" for the academic year "}
          <strong>{fields.academicYear}</strong>
          {
            " and that the same has been examined and duly signed by the concerned teachers."
          }
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          left: "66px",
          bottom: "260px",
          fontSize: "15px",
        }}
      >
        Date: <strong>{fields.issueDate}</strong>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "145px",
          left: "64px",
          right: "64px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div style={{ textAlign: "center", minWidth: "155px" }}>
          <div style={{ height: `${headingGap}px` }} />
          <div
            style={{
              borderTop: "1px solid #3a2f20",
              paddingTop: "6px",
              fontSize: "13px",
              lineHeight: "1.55",
              overflowWrap: "anywhere",
            }}
          >
            <div>{college.inchargeName}</div>
            <div>{college.inchargeTitle}</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "90px",
              height: "90px",
              border: "1.5px dashed #ae8d5f",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              textAlign: "center",
              color: "#8b785f",
            }}
          >
            College
            <br />
            Stamp
          </div>
        </div>

        <div style={{ textAlign: "center", minWidth: "185px" }}>
          <div style={{ height: `${headingGap}px` }} />
          <div
            style={{
              borderTop: "1px solid #3a2f20",
              paddingTop: "6px",
              fontSize: "13px",
              lineHeight: "1.55",
              overflowWrap: "anywhere",
            }}
          >
            <div>{college.headName}</div>
            <div>{college.headTitle}</div>
          </div>
          <div
            style={{
              marginTop: "10px",
              fontSize: "12px",
              fontWeight: "700",
              lineHeight: "1.5",
              color: "#5f4a2f",
            }}
          >
            <div>{college.headStampLine1}</div>
            <div style={{ fontStyle: "italic" }}>{college.headStampLine2}</div>
            <div style={{ fontStyle: "italic" }}>{college.headStampLine3}</div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "58px",
          left: "94px",
          right: "94px",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "14px",
        }}
      >
        <div>Internal Examiner</div>
        <div>External Examiner</div>
      </div>

      {fields.certificateId ? (
        <div
          style={{
            position: "absolute",
            bottom: "14px",
            right: "64px",
            fontSize: "9px",
            color: "#b49d7f",
          }}
        >
          ID: {fields.certificateId}
        </div>
      ) : null}
    </div>
  );
}

export default ClassicCertificate;
