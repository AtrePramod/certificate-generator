import { useMemo, useState } from "react";

function StudentTable({ students, selectedIndex, onSelect }) {
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const term = query.trim().toLowerCase();
    const withIndex = students.map((student, index) => ({ student, index }));

    if (!term) {
      return withIndex;
    }

    return withIndex.filter(({ student }) =>
      [student.Name, student.PRN, student.Class, student.Certificate_ID]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [students, query]);

  return (
    <div className="surface-card overflow-hidden p-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="section-title">Students</div>
          <p className="section-copy">Select one row to update the preview.</p>
        </div>

        <label className="w-full max-w-[220px]">
          <span className="field-label">Quick Search</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Name, PRN, or ID"
            className="input-modern"
          />
        </label>
      </div>

      <div className="mt-4 max-h-[350px] overflow-auto rounded-2xl border border-[rgba(16,35,56,0.12)] bg-white/90">
        <table className="w-full table-auto text-sm">
          <thead className="sticky top-0 z-10 bg-[var(--brand-soft)]/80 backdrop-blur">
            <tr className="text-left text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-500)]">
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">PRN</th>
              <th className="px-3 py-2">Class</th>
              <th className="px-3 py-2">Issue Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(16,35,56,0.08)]">
            {rows.length ? (
              rows.map(({ student, index }) => {
                const isSelected = index === selectedIndex;

                return (
                  <tr
                    key={`${student.Certificate_ID}-${index}`}
                    onClick={() => onSelect(index)}
                    className={`cursor-pointer transition ${
                      isSelected
                        ? "bg-[var(--brand)] text-white"
                        : "text-[var(--ink-700)] hover:bg-[rgba(17,105,138,0.08)]"
                    }`}
                  >
                    <td
                      className={`px-3 py-2 text-xs tabular-nums ${
                        isSelected ? "text-blue-100" : "text-[var(--ink-500)]"
                      }`}
                    >
                      {index + 1}
                    </td>
                    <td className="px-3 py-2 font-semibold">{student.Name}</td>
                    <td className="px-3 py-2 font-mono text-xs">
                      {student.PRN}
                    </td>
                    <td className="px-3 py-2">{student.Class}</td>
                    <td className="px-3 py-2">{student.Issue_Date}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-sm text-[var(--ink-500)]"
                >
                  {students.length
                    ? "No matches found for your search."
                    : "Upload Excel or use Quick Add Student to create records."}
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
