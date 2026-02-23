function StudentTable({ students, selectedIndex, onSelect }) {
  return (
    <div className="rounded-lg border bg-white">
      <div className="border-b p-4">
        <div className="text-sm font-semibold text-slate-900">Students</div>
        <div className="text-xs text-slate-500">
          Click a row to preview that certificate
        </div>
      </div>

      <div className="max-h-100 overflow-auto">
        <table className="w-full table-auto text-sm">
          <thead className="sticky top-0 bg-slate-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">PRN</th>
              <th className="px-3 py-2">Issue Date</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {students.length ? (
              students.map((s, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <tr
                    key={`${s.Certificate_ID}-${idx}`}
                    onClick={() => onSelect(idx)}
                    className={
                      "cursor-pointer " +
                      (isSelected
                        ? "bg-slate-900 text-white"
                        : "text-slate-700 hover:bg-slate-50")
                    }
                  >
                    <td className="px-3 py-2 text-xs text-slate-400 tabular-nums">
                      {idx + 1}
                    </td>
                    <td className="px-3 py-2 font-medium">{s.Name}</td>
                    <td className="px-3 py-2 font-mono text-xs">{s.PRN}</td>
                    <td className="px-3 py-2">{s.Issue_Date}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-10 text-center text-sm text-slate-400"
                >
                  Upload an Excel file to see students here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentTable;
