import { forwardRef } from 'react'
import ClassicCertificate from '../templates/ClassicCertificate'

const CertificatePreview = forwardRef(function CertificatePreview(
  { student, institutionName },
  ref,
) {
  const data = student || {
    Name: '',
    Course: '',
    Certificate_ID: '',
    Issue_Date: '',
  }

  return (
    <div className="rounded-lg border bg-white p-4" >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold text-slate-900">
            Certificate Preview
          </div>
          <div className="text-sm text-slate-600">
            {student
              ? 'Preview updates based on the selected student.'
              : 'Select a student to preview.'}
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-auto">
        <div
          ref={ref}
          className="mx-auto"
          style={{
            width: 1123,
            height: 794,
            backgroundColor: '#ffffff',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.06)',
          }}
        >
          <ClassicCertificate
            institutionName={institutionName}
            name={data.Name}
            course={data.Course}
            certificateId={data.Certificate_ID}
            issueDate={data.Issue_Date}
          />
        </div>
      </div>
    </div>
  )
})

export default CertificatePreview
