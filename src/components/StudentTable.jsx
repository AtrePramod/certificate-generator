function StudentTable({ students, selectedIndex, onSelect }) {
  return (
    <div className="rounded-lg border bg-white">
      <div className="border-b p-4">
        <div className="text-lg font-semibold text-slate-900">Students</div>
        <div className="text-sm text-slate-600">
          Select a student to preview the certificate
        </div>
      </div>

      <div className="max-h-[420px] overflow-auto">
        <table className="w-full table-auto">
          <thead className="sticky top-0 bg-slate-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3">Certificate ID</th>
              <th className="px-4 py-3">Issue Date</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {students.length ? (
              students.map((s, idx) => {
                const isSelected = idx === selectedIndex
                return (
                  <tr
                    key={`${s.Certificate_ID}-${idx}`}
                    onClick={() => onSelect(idx)}
                    className={
                      'cursor-pointer text-sm ' +
                      (isSelected
                        ? 'bg-slate-900 text-white'
                        : 'bg-white text-slate-800 hover:bg-slate-50')
                    }
                  >
                    <td className="px-4 py-3 font-medium">{s.Name}</td>
                    <td className="px-4 py-3">{s.Course}</td>
                    <td className="px-4 py-3">{s.Certificate_ID}</td>
                    <td className="px-4 py-3">{s.Issue_Date}</td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-10 text-center text-sm text-slate-600"
                >
                  Upload an Excel file to see students here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentTable
