import * as XLSX from 'xlsx'

const REQUIRED_COLUMNS = ['Name', 'Course', 'Certificate_ID', 'Issue_Date']

function normalizeRow(row) {
  return {
    Name: String(row.Name ?? '').trim(),
    Course: String(row.Course ?? '').trim(),
    Certificate_ID: String(row.Certificate_ID ?? '').trim(),
    Issue_Date: String(row.Issue_Date ?? '').trim(),
  }
}

export async function parseExcelFile(file) {
  // We parse the Excel file fully in the browser:
  // 1) Read file bytes via File.arrayBuffer()
  // 2) Use SheetJS (xlsx) to read the workbook
  // 3) Convert the first sheet into JSON rows
  // 4) Validate required header columns
  // 5) Return normalized student records for UI rendering

  const arrayBuffer = await file.arrayBuffer()
  const workbook = XLSX.read(arrayBuffer, { type: 'array' })

  const sheetName = workbook.SheetNames?.[0]
  if (!sheetName) {
    throw new Error('No sheet found in the uploaded Excel file.')
  }

  const sheet = workbook.Sheets[sheetName]
  if (!sheet) {
    throw new Error('Unable to read the first sheet of the Excel file.')
  }

  const rows = XLSX.utils.sheet_to_json(sheet, {
    defval: '',
    raw: false,
  })

  if (!rows.length) {
    return []
  }

  const presentColumns = Object.keys(rows[0] || {})
  const missing = REQUIRED_COLUMNS.filter((col) => !presentColumns.includes(col))
  if (missing.length) {
    throw new Error(`Missing required columns: ${missing.join(', ')}`)
  }

  return rows.map(normalizeRow)
}
