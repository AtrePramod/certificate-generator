import { useRef, useState } from 'react'
import { parseExcelFile } from '../utils/parseExcel'

function ExcelUpload({ onData }) {
  const inputRef = useRef(null)
  const [error, setError] = useState('')
  const [count, setCount] = useState(0)
  const [fileName, setFileName] = useState('')

  const handleChange = async (e) => {
    setError('')
    setCount(0)

    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)

    const isXlsx =
      file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.name.toLowerCase().endsWith('.xlsx')

    if (!isXlsx) {
      setError('Invalid file format. Please upload a .xlsx file.')
      onData([])
      if (inputRef.current) inputRef.current.value = ''
      return
    }

    try {
      const students = await parseExcelFile(file)
      setCount(students.length)
      onData(students)
    } catch (err) {
      setError(err?.message || 'Failed to parse Excel file.')
      onData([])
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="flex flex-col gap-2">
        <div className="text-lg font-semibold text-slate-900">Excel Upload</div>
        <div className="text-sm text-slate-600">
          Upload an Excel (.xlsx) file with columns: Name, Course, Certificate_ID,
          Issue_Date
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".xlsx"
          onChange={handleChange}
          className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-slate-800"
        />

        {fileName ? (
          <div className="text-sm text-slate-700">
            File: <span className="font-medium">{fileName}</span>
          </div>
        ) : null}

        {count > 0 ? (
          <div className="text-sm text-emerald-700">
            Imported <span className="font-semibold">{count}</span> records
          </div>
        ) : null}

        {error ? (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ExcelUpload
