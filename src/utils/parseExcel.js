import * as XLSX from "xlsx";

const REQUIRED_COLUMNS = [
  "Name",
  "PRN",
  "Certificate_ID",
  "Issue_Date",
];

function normalizeRow(row) {
  return {
    Name: String(row.Name ?? "").trim(),
    PRN: String(row.PRN ?? "").trim(),
    Certificate_ID: String(row.Certificate_ID ?? "").trim(),
    Issue_Date: String(row.Issue_Date ?? "").trim(),
  };
}

export async function parseExcelFile(file) {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });

  const sheetName = workbook.SheetNames?.[0];
  if (!sheetName) throw new Error("No sheet found in file.");

  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, {
    defval: "",
    raw: false,
  });

  if (!rows.length) return [];

  const presentColumns = Object.keys(rows[0]);
  const missing = REQUIRED_COLUMNS.filter(
    (col) => !presentColumns.includes(col),
  );

  if (missing.length) {
    throw new Error(`Missing columns: ${missing.join(", ")}`);
  }

  return rows.map(normalizeRow);
}
