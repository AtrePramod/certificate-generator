import { useMemo, useRef, useState } from 'react'
import ExcelUpload from './components/ExcelUpload'
import StudentTable from './components/StudentTable'
import CertificatePreview from './components/CertificatePreview'
import DownloadButton from './components/DownloadButton'

function App() {
  const [students, setStudents] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [institutionName, setInstitutionName] = useState('Your Institution Name')

  const certificateRef = useRef(null)

  const selectedStudent = useMemo(() => {
    if (selectedIndex === null) return null
    return students[selectedIndex] || null
  }, [students, selectedIndex])

  const handleData = (data) => {
    setStudents(data)
    setSelectedIndex(data.length ? 0 : null)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-semibold text-slate-900">
            Certificate Generator
          </div>
          <div className="text-sm text-slate-600">
            Upload Excel (.xlsx) → preview → download PDF
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-1">
            <ExcelUpload onData={handleData} />

            <div className="rounded-lg border bg-white p-4">
              <div className="text-lg font-semibold text-slate-900">
                Institution Name
              </div>
              <div className="mt-2">
                <input
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  placeholder="Enter institution name"
                  className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-slate-900"
                />
              </div>

              <div className="mt-4">
                <DownloadButton targetRef={certificateRef} student={selectedStudent} />
              </div>
            </div>

            <StudentTable
              students={students}
              selectedIndex={selectedIndex}
              onSelect={setSelectedIndex}
            />
          </div>

          <div className="lg:col-span-2">
            <CertificatePreview
              ref={certificateRef}
              student={selectedStudent}
              institutionName={institutionName}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
