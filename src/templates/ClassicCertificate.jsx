function ClassicCertificate({
  institutionName = "SIR PARASHURAMBHAU COLLEGE, PUNE-30",
  department = "DEPARTMENT OF STATISTICS",
  name,
  prn,
  className: studentClass,
  course = "Design of Experiment Course (Major)",
  subjectCode = "STM025105",
  academicYear = "2025-26",
  issueDate,
  certificateId,
}) {
  return (
    <div
      className="relative w-full h-full bg-white text-slate-900 font-serif"
      style={{ padding: "60px" }}
    >
      {/* OUTER BORDER */}
      <div className="absolute inset-3 border-4 border-slate-800 pointer-events-none" />

      {/* INNER BORDER */}
      <div className="absolute inset-6 border border-dashed border-slate-500 pointer-events-none" />

      {/* LEFT VERTICAL COLLEGE NAME */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-sm tracking-widest font-semibold text-slate-700">
        {institutionName}
      </div>

      {/* RIGHT VERTICAL DEPARTMENT */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 origin-right text-2xl font-semibold tracking-wide">
        {department}
      </div>

      {/* TITLE */}
      <div className="text-center mt-6">
        <div className="text-3xl font-bold tracking-wide">
          COMPLETION CERTIFICATE
        </div>
      </div>

      {/* BODY PARAGRAPH */}
      <div className="mt-14 text-[18px] leading-8 px-10 text-justify">
        <p>
          This is to certify that <strong>{name || "Student Name"}</strong>
          bearing PRN No. <strong>{prn || "SPXXXXXXXX"}</strong> of the{" "}
          <strong>{studentClass || "T.Y.B.Sc. (NEP 1.0)"}</strong> class has
          successfully completed all the practicals in{" "}
          <strong>{subjectCode}</strong> Practicals in <strong>{course}</strong>{" "}
          during the academic year <strong>{academicYear}</strong> and that the
          same has been examined and duly signed by the concerned teachers.
        </p>
      </div>

      {/* DATE */}
      <div className="absolute bottom-40 left-20 text-lg">
        <div className="font-semibold">Date: {issueDate || "DD/MM/YYYY"}</div>
      </div>

      {/* SIGNATURES */}
      <div className="absolute bottom-16 left-16 right-16 flex justify-between text-center">
        <div>
          <div className="h-12" />
          <div className="border-t border-slate-700 w-52 mx-auto mt-2"></div>
          <div className="mt-2 text-sm font-semibold">Practical In-Charge</div>
        </div>

        <div>
          <div className="h-12" />
          <div className="border-t border-slate-700 w-52 mx-auto mt-2"></div>
          <div className="mt-2 text-sm font-semibold">Head of Department</div>
        </div>

        <div>
          <div className="h-12" />
          <div className="border-t border-slate-700 w-52 mx-auto mt-2"></div>
          <div className="mt-2 text-sm font-semibold">External Examiner</div>
        </div>
      </div>

      {/* ROUND STAMP PLACE */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2">
        <div className="w-32 h-32 border-2 border-slate-600 rounded-full flex items-center justify-center text-center text-xs text-slate-600">
          College Stamp
        </div>
      </div>

      {/* CERTIFICATE ID (optional hidden QR later) */}
      <div className="absolute bottom-6 right-8 text-xs text-slate-500">
        Certificate ID: {certificateId || "AUTO-GENERATED"}
      </div>
    </div>
  );
}

export default ClassicCertificate;
