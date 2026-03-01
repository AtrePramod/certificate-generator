const LIMITS = {
  name: 64,
  prn: 28,
  subjectCode: 26,
  course: 140,
  semester: 12,
  academicYear: 24,
  certificateId: 48,
  issueDate: 24,
  trustName: 80,
  collegeName: 90,
  autonomyLine: 60,
  departmentName: 70,
  inchargeName: 48,
  inchargeTitle: 56,
  headName: 48,
  headTitle: 72,
  headStampLine: 52,
};

function cleanText(value) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function clampText(value, maxLength) {
  const text = cleanText(value);
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3).trimEnd()}...`;
}

function normalizeIssueDate(value) {
  const text = cleanText(value);
  if (!text) return "DD/MM/YYYY";

  const iso = text.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) {
    return `${iso[3]}/${iso[2]}/${iso[1]}`;
  }

  const dmy = text.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})$/);
  if (dmy) {
    const day = dmy[1].padStart(2, "0");
    const month = dmy[2].padStart(2, "0");
    const year = dmy[3].length === 2 ? `20${dmy[3]}` : dmy[3];
    return `${day}/${month}/${year}`;
  }

  return clampText(text, LIMITS.issueDate);
}

export function normalizeCertificateFields({
  name,
  prn,
  subjectCode,
  course,
  academicYear,
  semester,
  issueDate,
  certificateId,
}) {
  return {
    name: clampText(name || "STUDENT NAME", LIMITS.name).toUpperCase(),
    prn: clampText(prn || "SPXXXXXXXX", LIMITS.prn).toUpperCase(),
    subjectCode: clampText(subjectCode || "STM025105", LIMITS.subjectCode).toUpperCase(),
    course: clampText(course || "Design of Experiment Course (Major)", LIMITS.course),
    academicYear: clampText(academicYear || "2025-26", LIMITS.academicYear),
    semester: clampText(semester || "V", LIMITS.semester).toUpperCase(),
    issueDate: normalizeIssueDate(issueDate),
    certificateId: clampText(certificateId || "", LIMITS.certificateId).toUpperCase(),
  };
}

export function normalizeCollegeFields({
  trustName,
  collegeName,
  autonomyLine,
  departmentName,
  inchargeName,
  inchargeTitle,
  headName,
  headTitle,
  headStampLine1,
  headStampLine2,
  headStampLine3,
}) {
  return {
    trustName: clampText(trustName || "Shikshana Prasaraka Mandali's", LIMITS.trustName),
    collegeName: clampText(
      collegeName || "SIR PARASHURAMBHAU COLLEGE, PUNE-30",
      LIMITS.collegeName,
    ),
    autonomyLine: clampText(autonomyLine || "Empowered Autonomous", LIMITS.autonomyLine),
    departmentName: clampText(
      departmentName || "Department of Statistics",
      LIMITS.departmentName,
    ),
    inchargeName: clampText(inchargeName || "Mr. Kamble S D", LIMITS.inchargeName),
    inchargeTitle: clampText(
      inchargeTitle || "Practical In-Charge",
      LIMITS.inchargeTitle,
    ),
    headName: clampText(headName || "Ms. Tai Turkunde", LIMITS.headName),
    headTitle: clampText(
      headTitle || "Head, Department of Statistics",
      LIMITS.headTitle,
    ),
    headStampLine1: clampText(headStampLine1 || "Head", LIMITS.headStampLine),
    headStampLine2: clampText(
      headStampLine2 || "Department of Statistics",
      LIMITS.headStampLine,
    ),
    headStampLine3: clampText(
      headStampLine3 || "S. P. College, Pune-30",
      LIMITS.headStampLine,
    ),
  };
}

export function getTextDensity(fields) {
  const narrativeLength =
    fields.name.length +
    fields.prn.length +
    fields.subjectCode.length +
    fields.course.length;

  if (narrativeLength > 210) {
    return { bodyFontSize: 12.6, bodyLineHeight: 1.58, headingGap: 30 };
  }

  if (narrativeLength > 170) {
    return { bodyFontSize: 13.1, bodyLineHeight: 1.66, headingGap: 32 };
  }

  if (narrativeLength > 140) {
    return { bodyFontSize: 13.7, bodyLineHeight: 1.74, headingGap: 33 };
  }

  return { bodyFontSize: 14.2, bodyLineHeight: 1.84, headingGap: 34 };
}
