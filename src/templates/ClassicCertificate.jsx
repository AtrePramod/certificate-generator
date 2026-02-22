function ClassicCertificate({ institutionName, name, course, issueDate, certificateId }) {
  return (
    <div
      className="relative h-full w-full"
      style={{ backgroundColor: '#ffffff', color: '#0f172a' }}
    >
      <div
        className="absolute inset-6 rounded-md"
        style={{ border: '2px solid #0f172a' }}
      />
      <div
        className="absolute inset-10 rounded-md"
        style={{ border: '1px solid #94a3b8' }}
      />

      <div className="absolute left-0 right-0 top-14 text-center">
        <div
          className="text-xs font-semibold uppercase tracking-[0.35em]"
          style={{ color: '#64748b' }}
        >
          {institutionName}
        </div>
        <div className="mt-3 text-3xl font-semibold tracking-tight">
          Certificate of Completiom
        </div>
        <div className="mt-2 text-sm" style={{ color: '#475569' }}>
          This certificate is proudly presented to
        </div>
      </div>

      <div className="absolute left-0 right-0 top-[245px] text-center">
        <div className="text-5xl font-semibold tracking-tight">
          {name || 'Student Name'}
        </div>
        <div
          className="mx-auto mt-5 h-px w-[520px]"
          style={{ backgroundColor: '#e2e8f0' }}
        />
        <div className="mt-5 text-base" style={{ color: '#334155' }}>
          for successfully completing
        </div>
        <div className="mt-3 text-2xl font-semibold">
          {course || 'Course / Event Name'}
        </div>
      </div>

      <div className="absolute bottom-14 left-14">
        <div
          className="text-xs uppercase tracking-wider"
          style={{ color: '#64748b' }}
        >
          Certificate ID
        </div>
        <div className="mt-1 text-sm font-semibold" style={{ color: '#1f2937' }}>
          {certificateId || '—'}
        </div>
      </div>

      <div className="absolute bottom-14 right-14 text-right">
        <div
          className="text-xs uppercase tracking-wider"
          style={{ color: '#64748b' }}
        >
          Issue Date
        </div>
        <div className="mt-1 text-sm font-semibold" style={{ color: '#1f2937' }}>
          {issueDate || '—'}
        </div>
      </div>
    </div>
  )
}

export default ClassicCertificate
